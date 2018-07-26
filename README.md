# ngx-switcher

Easily navigate to `typescript(.ts)`|`template(.html)`|`pug-template(.pug)`|`style(.scss/.sass/.less/.css)` in angular2+ project.

## Usage

* Switch `.ts`|`.html`|`.pug`|`.css`|`.spec.ts` fastly.

  * `alt+o`(Windows) `shift+alt+o`(macOS)

    > if on `.ts|.css|.spec.ts|.pug`: go to html<br>
    > if on `.html`: go to previous

  * `alt+i`(Windows) `shift+alt+i`(macOS)

    > if on `.ts|.html|.spec.ts|.pug`: go to css<br>
    > if on `.css`: go to previous

  * `alt+u`(Windows) `shift+alt+u`(macOS)

    > if on `.css|.html|.spec.ts|.pug`: go to ts<br>
    > if on `ts`: go to previous

  * `alt+p`(Windows) `shift+alt+p`(macOS)
    > if on `.ts|.css|.html|.spec.ts`: go to .pug<br>
    > if on `.pug`: go to previous

  * `alt+l`(Windows) `shift+alt+l`(macOS)
    > if on `.ts|.css|.html|.pug`: go to spec.ts<br>
    > if on `.spec.ts`: go to previous

This is fork of [angular2-switcher](https://github.com/infinity1207/angular2-switcher) project.