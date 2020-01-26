# @eyedea/syncano-test

Test solution for syncano socket based on @eyedea/syncano.

[![npm version](https://img.shields.io/npm/v/@eyedea/syncano-test.svg)](https://www.npmjs.com/package/@eyedea/syncano-test)
[![license](https://img.shields.io/github/license/eyedea-io/syncano-test.svg)](https://github.com/eyedea-io/syncano-test/blob/master/LICENSE)

## Install

```
$ npm install -D @eyedea/syncano-test
```

## Usage

```tsx
/* syncano/SOCKET/__tests__/ENDPOINT-NAME.test.js */
import {run, stub, createSyncanoCoreMock} from '@eyedea/syncano'

describe('SOCKET/ENDPOINT-NAME', () => {
  it('should not fail', async () => {
    const meta = {
      user: undefined
    }
    const args = {
      id: 1
    }
    const mocks = createSyncanoCoreMock({
      endpoint: {
        get: stub().resolves({
          inOrganization: true
        })
      },
      data: {
        resource: {
          find: stub().resolves({
            id: args.id,
            organization: 20
          }),
          findOrFail: stub().resolves(args)
        }
      }
    })

    const result = await run('ENDPOINT-NAME', {args, meta}, {mocks})
    expect(result).toHaveProperty('code', 401)
  })
})
```

## License

MIT © <a href="https://eyedea.io">Eyedea AS</a>
