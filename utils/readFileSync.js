import fs from "fs";

export function readFileSync(filePath) {
    try {
        // Чтение файла синхронно и возвращение его содержимого
        const content = fs.readFileSync(filePath, "utf8");
        return content;
    } catch (error) {
        console.error("Ошибка при чтении файла:", error);
        return null;
    }
}
