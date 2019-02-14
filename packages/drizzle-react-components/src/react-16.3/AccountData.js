import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class AccountData extends Component {
  constructor(props, context) {
    super(props)

    this.precisionRound = this.precisionRound.bind(this)
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
  }

  render() {
    // No accounts found.
    if (Object.keys(this.props.drizzleState.accounts).length === 0) {
      return <span>Initializing...</span>
    }

    // Get account address and balance.
    const address = this.props.drizzleState.accounts[this.props.accountIndex]
    var balance = this.props.drizzleState.accountBalances[address]
    const units = this.props.units
      ? this.props.units.charAt(0).toUpperCase() + this.props.units.slice(1)
      : 'Wei'

    // Convert to given units.
    if (this.props.units && typeof balance !== 'undefined') {
      balance = this.props.drizzle.web3.utils.fromWei(balance, this.props.units)
    }

    // Adjust to given precision.
    if (this.props.precision) {
      balance = this.precisionRound(balance, this.props.precision)
    }

    return (
      <div>
        <h4>{address}</h4>
        <p>
          {balance} {units}
        </p>
      </div>
    )
  }
}

export default AccountData
