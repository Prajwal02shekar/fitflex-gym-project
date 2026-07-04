import React from 'react'

const MembersCard = ({ member }) => {
    console.log(member, "Members Card")

    let dueAmount = Number(member.totalFee) - Number(member.amountPaid)
    return (
        <section className="member-card">
            <aside className="member-card-top">
                <h3>Member Name: {member.memberName}</h3>
                <h3>Member Plan: {member.memberPlan}</h3>
                <h5>Total Fee: ₹ {member.totalFee}/-</h5>
                <h5>Amount Paid : ₹ {member.amountPaid}/-</h5>
                <h5>Due : ₹ {dueAmount}/-</h5>
                <h5>Joined On : {member.joinedOn}</h5>
            </aside>
            <aside className="member-card-buttons">
                <button>Pay</button>
                <button>Refund</button>
                <button>Upgrade Plan</button>
                <button>Delete</button>
            </aside>


        </section>
    )
}

export default MembersCard