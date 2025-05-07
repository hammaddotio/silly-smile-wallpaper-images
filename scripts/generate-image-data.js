const fs = require('fs');
const path = require('path');

const IMAGE_ROOT = path.join(__dirname, '../', 'dist', 'assets', 'images');
const OUTPUT_FILE = path.join(__dirname, '../', 'data', 'wallpapers.json');
const BASE_URL = '/assets/images/';

function generateImageData() {
    const allTopics = fs.readdirSync(IMAGE_ROOT);
    let topics = [];
    let idCounter = 0;

    // Separate "popular" topic and sort others alphabetically
    if (allTopics.includes('Popular')) {
        topics.push('Popular');
        topics = topics.concat(
            allTopics
                .filter(t => t !== 'Popular')
                .sort((a, b) => a.localeCompare(b))
        );
    } else {
        topics = allTopics.sort((a, b) => a.localeCompare(b));
    }

    const result = [];

    topics.forEach(topic => {
        const topicPath = path.join(IMAGE_ROOT, topic);
        if (fs.statSync(topicPath).isDirectory()) {
            const images = fs.readdirSync(topicPath);

            images.forEach(imageFile => {
                const ext = path.extname(imageFile);
                const name = path.basename(imageFile, ext);

                result.push({
                    id: idCounter++,
                    name: formatName(name),
                    topic: formatName(topic),
                    author: 'Unknown',
                    url: `${BASE_URL}${topic}/${imageFile}`
                });
            });
        }
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
    console.log(`Generated ${result.length} entries with IDs from 0 to ${idCounter - 1}`);
}

function formatName(str) {
    return str
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

generateImageData();