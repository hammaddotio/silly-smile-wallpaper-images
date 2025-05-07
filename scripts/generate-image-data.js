const fs = require('fs');
const path = require('path');

const IMAGE_ROOT = path.join(__dirname, '../', 'dist', 'assets', 'images');
const OUTPUT_DEV = path.join(__dirname, '../', 'wallpapers.dev.json');
const OUTPUT_PROD = path.join(__dirname, '../', 'wallpapers.prod.json');

// Configuration
// const ENV = process.env.NODE_ENV || 'development';
const BASE_URLS = {
    development: '/dist/assets/images',
    production: 'https://hammaddotio.github.io/silly-smile-wallpaper-images/dist/assets/images'
};

function generateImageData(outputPath, baseUrl) {
    const allTopics = fs.readdirSync(IMAGE_ROOT);
    let topics = [];
    let idCounter = 0;

    // Topic sorting logic (keep popular first)
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
                    url: `${baseUrl}/${topic}/${imageFile}`
                });
            });
        }
    });

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`Generated ${result.length} entries in ${path.basename(outputPath)}`);
}

function formatName(str) {
    return str
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Generate both files
generateImageData(OUTPUT_DEV, BASE_URLS.development);
generateImageData(OUTPUT_PROD, BASE_URLS.production);