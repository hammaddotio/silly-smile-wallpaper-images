const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configuration
const IMAGE_ROOT = path.join(__dirname, '../', 'dist', 'assets', 'images');
const JSON_FILES = {
    dev: path.join(__dirname, '../', 'wallpapers.dev.json'),
    prod: path.join(__dirname, '../', 'wallpapers.prod.json')
};
const PREFIX = 'wallpaper'; // Customize this (or set to '')

// Rename images and update JSON
async function renameImages() {
    try {
        const topics = fs.readdirSync(IMAGE_ROOT);
        const renameMap = new Map();

        // First pass: Rename files and build mapping
        for (const topic of topics) {
            const topicPath = path.join(IMAGE_ROOT, topic);
            if (!fs.statSync(topicPath).isDirectory()) continue;

            const images = fs.readdirSync(topicPath);
            for (const oldName of images) {
                const ext = path.extname(oldName);
                const newName = `${PREFIX}-${uuidv4()}${ext}`.toLowerCase();

                const oldPath = path.join(topicPath, oldName);
                const newPath = path.join(topicPath, newName);

                fs.renameSync(oldPath, newPath);
                renameMap.set(oldName, newName);
            }
        }

        // Second pass: Update JSON files
        for (const [env, jsonPath] of Object.entries(JSON_FILES)) {
            const data = JSON.parse(fs.readFileSync(jsonPath));
            const updatedData = data.map(entry => {
                const oldFilename = path.basename(entry.url);
                const newFilename = renameMap.get(oldFilename);
                return {
                    ...entry,
                    url: entry.url.replace(oldFilename, newFilename)
                };
            });

            fs.writeFileSync(jsonPath, JSON.stringify(updatedData, null, 2));
            console.log(`Updated ${env} JSON file`);
        }

        console.log('Renaming complete!');
        console.log(`${renameMap.size} images renamed`);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Run the script
renameImages();