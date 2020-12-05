
const micro = require('micro');
const formidable = require('formidable');
const file = require('file-system');

export const config = {
    api: {
      bodyParser: false,
    },
};

export default async (req, res) => {

    return new Promise(async (resolve, reject) => {
        const form = formidable.IncomingForm({
          multiples: true,
          keepExtensions: true,
          maxFileSize: 1000 * 1000 * 1000
        });

        form.on("file", (name, f) => {
            console.log(f);

            const data = file.readFileSync(f.path);
            file.writeFileSync(`public/upload/${f.name}`, data);
            file.unlinkSync(f.path);
        })
        .on('progress', (bytesReceived, bytesExpected) => {

        })
        .on("aborted", () => {
            reject(res.status(500).send('Aborted'))  
        })
        .on("end", () => {
            resolve(res.status(200).send('done'));
        });

        await form.parse(req)
    });
};