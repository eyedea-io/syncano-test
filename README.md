# @eyedea/syncano-test

Test solution for syncano socket based on [@eyedea/syncano](https://github.com/eyedea-io/syncano).

[![npm version](https://img.shields.io/npm/v/@eyedea/syncano-test.svg)](https://www.npmjs.com/package/@eyedea/syncano-test)
[![license](https://img.shields.io/github/license/eyedea-io/syncano-test.svg)](https://github.com/eyedea-io/syncano-test/blob/master/LICENSE)

## Install

Install package in your socket directory:

```
$ npm install -D @eyedea/syncano-test
```

> It is recommended to install this package as dev dependency, otherwise a lot of unnecessary packages will be deployed with socket.

## Usage

1. Create `__tests__` directory in your socket. Add `__tests__/tsconfig.json` with the following content:

```json
{
  "compilerOptions": {
    "lib": ["ES2015"]
  }
}
```

2. Create your test file `__tests__/ENDPOINT-NAME.test.js`

```tsx
import {run, stub, createSyncanoCoreMock} from '@eyedea/syncano'

describe('SOCKET/ENDPOINT-NAME', () => {
  it('should not fail', async () => {
    const meta = {user: undefined}
    const args = {id: 1}
    const mocks = createSyncanoCoreMock({
      data: {
        entity: {
          create: stub().resolves(args)
          fields: stub().fn({
            with: stub().fn({
              findOrFail: stub().resolves(args)
            })
          })
        }
      }
    })
    const result = await run('ENDPOINT-NAME', {args, meta}, {mocks})
    expect(result).toHaveProperty('data.id', args.id)
    expect(result).toHaveProperty('code', 200)
  })
})
```

## License

MIT © <a href="https://eyedea.io">Eyedea AS</a>
