// - Тарифный план
class Plan {
    constructor(id, monthPayment, smsCost, callCost) {
        this.id = id
        this.monthPayment = monthPayment
        this.smsCost = smsCost
        this.callCost = callCost
    }
}

module.exports = Plan