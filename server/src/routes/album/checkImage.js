const config = require('../../config/config');
const { spawnSync } = require('child_process');

const checkImage = async (req, res) => {
  try {
    const animal = req.body.class === '강아지' ? 16 : 15;
    const { inputFiles } = req.body;
    const imageLinks = inputFiles.map((el) => {
      return `./uploads/${el.split(config.fileUrl)[1]}`;
    });
    // const pythonProcess = spawnSync('python3', ['./src/routes/album/classification.py', ...imageLinks]);
    const pythonProcess = spawnSync('python', ['./src/routes/album/classification.py', ...imageLinks]);

    if (pythonProcess.error) {
      console.error(`Error: ${pythonProcess.error.message}`);
      return res.status(500).send({ ok: false, data: `Error: ${pythonProcess.error.message}` });
    }

    const stdout = pythonProcess.stdout.toString();
    const stderr = pythonProcess.stderr.toString();

    console.log(`stdout: ${stdout}`);
    if (stderr) console.log(`stdout: ${stdout}`);

    if (pythonProcess.status !== 0) {
      return res.status(500).send({ ok: false, data: `Python script exited with ${stderr}` });
    }

    const lines = stdout.split('\n');
    const lastLine = lines[lines.length - 2];

    const result = JSON.parse(lastLine).map((el, i) => {
      const classification = el === animal ? true : false;
      const obj = {
        url: inputFiles[i],
        check: classification,
      };
      return obj;
    });

    res.status(200).json({ ok: true, data: result });
  } catch (e) {
    console.log(e);
  }
};

module.exports = checkImage;

/**
 * @swagger
 *
 * /v1/album/check:
 *  post:
 *    summary: "이미지 유효성 검사"
 *    description: "Header Authorization에 Bearer token 정보 필요"
 *    tags: [Album]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              class:
 *                type: string
 *                description: "선택한 동물 종(강아지/고양이)"
 *              inputFiles:
 *                type: array
 *                description: "유효성 검사할 이미지 리스트"
 *          example:
 *            inputFiles: [
 *              "http://srulab.iptime.org:4002/uploads/test/00001.jpg",
 *              "http://srulab.iptime.org:4002/uploads/test/00002.jpg",
 *              "http://srulab.iptime.org:4002/uploads/test/00003.jpg",
 *              "http://srulab.iptime.org:4002/uploads/test/00004.jpg",
 *              "http://srulab.iptime.org:4002/uploads/test/00009.jpg",
 *              "http://srulab.iptime.org:4002/uploads/test/00010.jpg",
 *              "http://srulab.iptime.org:4002/uploads/test/00011.jpg"
 *              ]
 *            class: "고양이"
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            example:
 *              ok: true
 *              data: [
 *                {
 *                  url: "string",
 *                  check: true
 *                }
 *              ]
 */
