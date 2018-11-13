# rematch-inject

Injecting [rematch](https://github.com/rematch/rematch) models to React components in MobX-like way.

"Injecting model" means connecting it's state and all model's actions to component.

## Usage

```jsx harmony
import React, { Component } from 'react'
import { inject } from 'rematch-inject'

class App extends Component {
  render() {
    return <div>Hello { this.props.user }!</div>
  }
}

export default inject('user', 'settings', 'accounts')(App)
```

## Motivation

Tradtitional way to connect `rematch` models to components assumes using `react-redux` and `mapStateToProps` and `mapDispatchToProps` functions:

```jsx harmony
import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return <div>Hello { this.props.user }!</div>
  }
}

function mapStateToProps({ user, settings, accounts }) {
  return {
    user,
    settings,
    accounts
  }
}

function mapDispatchToProps({ user, settings, accounts }) {
  return {
    ...user,
    ...settings,
    ...accounts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

Too much boilerplate.

With `rematch-inject` you shouldn't use this functions anymore.

## More usage variations

### Decorator

You can use `inject` as decorator:

```jsx harmony
import React, { Component } from 'react'
import { inject } from 'rematch-inject'

@inject('user', 'settings', 'accounts')
class App extends Component {
  render() {
    return <div>Hello { this.props.user }!</div>
  }
}
```

### mapStateToProps and mapDispatchToProps

You can also pass `mapStateToProps` and `mapDispatchToProps` function as you do with `react-redux` `connect`.

```jsx harmony
inject(mapStateToProps, mapDispatchToProps)
```

