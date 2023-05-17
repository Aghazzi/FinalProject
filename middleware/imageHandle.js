import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname +
                "-" +
                Date.now() +
                "." +
                file.mimetype.split("/")[1]
        );
    },
});
const upload = multer({ storage });
export default function (req, res, next) {
    upload.single("image")(req, res, (err) => {
        try {
            if (err) {
                return res.status(400).send(err.message);
            }
            console.log(req.body)
            req.body.image = req.file.path;
            next();
        } catch (err) {
            return res.status(400).send({ err: err.message });
        }
    });
}