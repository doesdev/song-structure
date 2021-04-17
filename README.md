# song-structure [![NPM version](https://badge.fury.io/js/song-structure.svg)](https://npmjs.org/package/song-structure)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)   

> Get rough idea on potential song structures from the CLI

[songstructure.doesdev.com](https://songstructure.doesdev.com/)
------

![example](example.gif)

## Structuring music can be hard, this aims to ease it a tiny bit
This is a little utility that prompts for the number of beats in the song, beats per measure, desired structure (Intro, Verse, Chorus, Verse...), then distributes those proportionally using pre-set weights for each part type and provides those recommendations.

From there it will print a suggested number of measures and beats each part should get.

Of course music isn't a simple formula, so consider this just some rough suggestions.

# Usage
```sh
# Install globally
$ npm install --global song-structure
```

```sh
song-structure # then follow the prompts
```

# License

MIT © [Andrew Carpenter](https://github.com/doesdev)
