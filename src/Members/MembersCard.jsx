import React from 'react'

const MembersCard = ({ member }) => {
    console.log(member, "Members Card")

    let dueAmount = Number(member.totalFee) - Number(member.amountPaid)
    return (
        <section className="member-card">
            <aside className="member-card-top">
                <h3>Member Name:{member.memberName}</h3>
                <h3>Member Plan: {member.memberPlan}</h3>
                <h3>Member ID: {member.id}</h3>
                <h4>Total Fee: ₹ {member.totalFee}/-</h4>
                <h4>Amount Paid : ₹ {member.amountPaid}/-</h4>
                <h4>Due : ₹ {dueAmount}/-</h4>
                <h4>Joined On : {member.joinedOn}</h4>
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