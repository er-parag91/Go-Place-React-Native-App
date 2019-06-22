const functions = require("firebase-functions");
const cors = require("cors")({
    origin: true
});
const fs = require("fs");
const UUID = require("uuidv4");
const admin = require("firebase-admin");

const {
    Storage
} = require('@google-cloud/storage');
const storage = new Storage({
    projectId: "go-places-79741"
})

admin.initializeApp({
    credential: admin.credential.cert(require("./go-places.json"))
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
            response.status(403).json({
                error: "Unauthorized"
            });
            return;
        }
        let idToken;
        idToken = request.headers.authorization.split('Bearer ')[1];
        admin
            .auth()
            .verifyIdToken(idToken)
            .then(decodedToken => {
                const body = JSON.parse(request.body);
                fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
                    return response.status(500).json({
                        error: err
                    });
                });
                const bucket = storage.bucket("go-places-79741.appspot.com");
                const uuid = UUID();
                bucket.upload("/tmp/uploaded-image.jpg", {
                    uploadType: "media",
                    destination: "/places/" + uuid + ".jpg",
                    metadata: {
                        metadata: {
                            contentType: "image/jpeg",
                            firebaseStorageDownloadTokens: uuid
                        }
                    }

                }, (err, file) => {
                    if (!err) {
                        response.status(201).json({
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                                bucket.name +
                                "/o/" +
                                encodeURIComponent(file.name) +
                                "?alt=media&token=" +
                                uuid,
                                imagePath: "/places/" + uuid + ".jpg"
                        });
                    } else {
                        response.status(500).json({
                            error: err
                        });
                    }
                });
            })
            .catch(() => {
                response.status(403).json({
                    error: "Unauthorized"
                });
            });
    });
});

exports.deleteImage = functions.database
    .ref("/placeData/{placeId}")
    .onDelete((event) => {
        const placeData = event.val();
        const imagePath = placeData.imagePath;

        const bucket = storage.bucket("go-places-79741.appspot.com");
        return bucket.file(imagePath).delete();

})