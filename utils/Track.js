const playdl = require('play-dl');

class Track {
    constructor({ title, url, thumbnail, stream, requester }) {
        this.title = title;
        this.url = url;
        this.thumbnail = thumbnail;
        this.stream = stream;
        this.requester = requester;
    }

    static async from(query, requester) {
        const isUrl = /^(https?:\/\/)/.test(query);
        let info;

        if (isUrl) {
            info = await playdl.video_info(query);
        } else {
            const searchResults = await playdl.search(query, { limit: 1 });
            if (!searchResults.length) throw new Error('Música não encontrada');
            info = await playdl.video_info(searchResults[0].url);
        }

        const trackStream = await playdl.stream(info.video_details.url);

        return new Track({
            title: info.video_details.title,
            url: info.video_details.url,
            thumbnail: info.video_details.thumbnails[0].url,
            stream: trackStream.stream,
            requester
        });
    }
}

module.exports = { Track };
