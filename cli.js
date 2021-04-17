#! /usr/bin/env node
'use strict'

const prompts = require('prompts')
const { suggestedStructure, partsDefinition: PARTS } = require('./index')

const END = Symbol('end')

const onState = (state) => {
  if (!state.aborted) return
  process.stdout.write('\x1B[?25h')
  process.stdout.write('\n')
  process.exit(1)
}

const main = async () => {
  const { beats, bpMeasure } = await prompts([
    {
      type: 'number',
      name: 'beats',
      message: 'How many beats are in the song?',
      onState
    },
    {
      type: 'number',
      name: 'bpMeasure',
      message: 'How many beats are there per measure?',
      onState
    }
  ])

  const structure = []

  while (structure[structure.length - 1]?.part !== END) {
    const hasParts = structure.length
    const prefix = hasParts ? 'Next' : 'First'
    const suffix = hasParts && ` [${structure.map((p) => p.part).join(', ')}]`
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

    structure.push({ part })
  }

  structure.pop()

  suggestedStructure(structure, beats, bpMeasure).forEach((p) => {
    const measureText = p.measures && ` ${p.measures} measures`
    const beatsText = p.beats && ` ${p.beats} beats`
    const append = [measureText, beatsText].filter((t) => t).join(',')
    console.log(`${p.part}:${append}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
