import { fetchService } from '@src/srv/fetch.service'
import { urlService } from '@src/srv/url.service'
import { Component, h, State } from '@stencil/core'

// const jsondiffpatch = require('jsondiffpatch').create()
// import * as jsondiffpatchStatic from 'jsondiffpatch'
// const jsondiffpatchStatic = require('jsondiffpatch/dist/jsondiffpatch.cjs.js') as any
// const jsondiffpatch = jsondiffpatchStatic.create()

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  @State() qs: any
  @State() full = false
  @State() url1: string
  @State() url2: string

  @State() json1: any
  @State() json2: any

  @State() visualDiff: string

  async componentWillLoad(): Promise<void> {
    this.qs = urlService.parseQuery(location.search)
    this.url1 = this.qs.url1 || '/assets/ex1.json'
    this.url2 = this.qs.url2 || '/assets/ex2.json'
    this.full = !!this.qs.full

    void fetchService.get(this.url1).then(r => {
      this.json1 = r
      this.updateDiff()
    })

    void fetchService.get(this.url2).then(r => {
      this.json2 = r
      this.updateDiff()
    })
  }

  private updateDiff(): void {
    if (!this.json1 || !this.json2) return

    const jsondiffpatch = (window as any).jsondiffpatch

    const delta = jsondiffpatch.diff(this.json1, this.json2)
    if (!this.full) {
      jsondiffpatch.formatters.html.hideUnchanged()
    }
    this.visualDiff = jsondiffpatch.formatters.html.format(delta, this.json1) || '<i>no changes</i>'
  }

  render() {
    const loading1 = this.json1 ? '' : 'Loading url1...'
    const loading2 = this.json2 ? '' : 'Loading url2...'

    return (
      <div>
        <div>{loading1}</div>
        <div>{loading2}</div>
        <div />
        <div innerHTML={this.visualDiff} />
      </div>
    )
  }
}
