#! /usr/bin/env node
'use strict'

const prompts = require('prompts')
const hareNiemeyer = require('hare-niemeyer')

const CAPTURE_MEASURES = false
const END = Symbol('end')
const PARTS = {
  Intro: 1,
  Chorus: 2,
  Verse: 4,
  Bridge: 2,
  Outro: 1
}

const onState = (state) => {
  if (!state.aborted) return
  process.stdout.write('\x1B[?25h')
  process.stdout.write('\n')
  process.exit(1)
}

const main = async () => {
  const { beats } = await prompts([
    {
      type: 'number',
      name: 'beats',
      message: 'How many beats are in the song?',
      onState
    },
    {
      type: CAPTURE_MEASURES ? 'number' : null,
      name: 'measures',
      message: 'How many beats are there per measure?',
      onState
    }
  ])

  const structure = []

  while (structure[structure.length - 1] !== END) {
    const hasParts = structure.length
    const prefix = hasParts ? 'Next' : 'First'
    const suffix = hasParts && ` [${structure.join(', ')}]`
    const message = `${prefix} song part${suffix || ''}`
    const final = { title: '(done)', value: END }

    const choices = Object.keys(PARTS).map((k) => {
      return { value: k, title: k }
    }).concat(final)

    const { part } = await prompts({
      type: 'select',
      name: 'part',
      initial: 0,
      message,
      choices,
      onState
    })

    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(1)

    structure.push(part)
  }

  structure.pop()

  console.log(beats)
  console.log(structure)

  const counts = structure.reduce((out, p) => {
    out[p] = (out[p] || 0) + 1
    return out
  }, {})

  const current = {}
  const processed = {}
  const numbered = structure.map((p) => {
    if (counts[p] < 2) {
      processed[p] = PARTS[p]
      return p
    }

    const partCount = `${p} ${(current[p] = (current[p] || 0) + 1)}`
    processed[partCount] = PARTS[p]
    return partCount
  })

  const result = hareNiemeyer(processed, beats)
  numbered.forEach((p) => {
    console.log(`${p}: ${result[p]} beats`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
