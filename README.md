# song-structure [![NPM version](https://badge.fury.io/js/song-structure.svg)](https://npmjs.org/package/song-structure)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)   

> Get rough idea on potential song structures from the CLI

## Structuring music can be hard, this aims to ease it a tiny bit
This isn't planned to be an active project, unless there is much interest in it then it probably won't ever be much more than it is.

Currently it simply prompts for the number of beats in the song, desired structure (Intro, Verse, Chorus, Verse...), then distributes those in a naive manner using a (Hare-Niemeyer)[https://github.com/juliuste/hare-niemeyer] algorithm and pre-set proportions for each part type.

From there it will print (roughly) how many beats each part should get. Now, it doesn't yet take into account how many beats there are per measure, which is really important when dividing up a song. It also doesn't attempt to deal with odd numbers of beats.

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
