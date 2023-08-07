import fs from "fs";

export const writeFile = (name, data) => {
    fs.writeFile(`${name}.html`, data, () => {
        try {
            console.log("Файл сохранен");
        } catch (error) {
            console.log("Ошибка при сохранении файла: ", err);
        }
    });
};
