> :warning: **Due to modern technologies this tool is no longer being developed** :warning:

# @namics/remlog-scheme

###### Contents

```js
const { fields, Scheme, isSchemeIdValid, isCustomField } = require("@namics/remlog-scheme");
```

### Scheme

##### Class interface

```js
type SchemeValidationType {
	key: string,
	error: Error | null
};

interface IScheme {
	get(): Object;
	validate(): Array<SchemeValidationType>;
	clean(): void;
	serialize(): string;
	toString(): string;
}
```

##### Internal use

```js
const { Scheme } = require("@namics/remlog-scheme");

const examplePayload = {
    shortMessage: "Some message",
    fullMessage: "An extended message for the log",
    level: 5,
    file: "example.js",
    line: 172,
    timestamp: "2018-01-18T15:16:15.244Z"
};

const validCustomPayload = Object.assign({}, examplePayload, {
    $custom: "some data ..." // custom fields are prefixed by dollar
});

const invalidPayload = Object.assign({}, examplePayload, {
    id: "8an204asdf1" // it is not allowed to set the ID manually
});

const validScheme = new Scheme(examplePayload);
validScheme.validate(); // returns []

const validCustomScheme = new Scheme(validCustomPayload);
validCustomScheme.validate(); // returns []

const invalidScheme = new Scheme(invalidPayload);
invalidScheme.validate(); // returns [{key: 'id', error: Error('The key id is a computed field and cannot be set manually.')}]

validScheme.get(); // will return the full scheme including timestamp, id etc.
```

> Review the [Changelog](/packages/scheme/CHANGELOG.md)
