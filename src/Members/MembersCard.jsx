import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MembersCard = ({ member }) => {
    let [action, setAction] = useState(null);
    let [amount, setAmount] = useState('')
    let [description, setDescription] = useState('')
    let navigate = useNavigate();

    let hanldePay = async () => {
        let value = Number(amount);

        if (!value || value < 0) {
            toast.error("Enter valid amount")
            return
        }

        let updatedPaid = Number(member.amountPaid) + value;

        await axios.patch(`http://localhost:3000/members/${member.id}`, {
            amountPaid: updatedPaid
        })

        await axios.post('http://localhost:3000/payments', {
            memberId: member.id,
            memberName: member.memberName,
            type: "Payment",
            description: description || "Membership Payment",
            amount: value,
            transaction: new Date().toLocaleString()
        })

        setAmount("")
        setDescription("")
        toast.success("Payment Recorded")
        setTimeout(() => {
            navigate('/members')
        }, 1000)
    }
    let handleRefund = async () => {
        let value = Number(amount);

        let updatedPaid = Number(member.amountPaid) - value;

        await axios.patch(`http://localhost:3000/members/${member.id}`, {
            amountPaid: updatedPaid
        })

        await axios.post('http://localhost:3000/payments', {
            memberId: member.id,
            memberName: member.memberName,
            type: "Payment",
            description: description || "Amount Refunded",
            amount: value,
            transaction: new Date().toLocaleString()
        })

        setAmount("")
        setDescription("")
        onChanged()
        toast.success("Refund Success")
        onChanged()
        setTimeout(() => {
            navigate('/members')
        }, 1000)
    }

    let handleReset = () => {
        setAction(null)
        setAction("")
        setDescription("")
        onChanged()
    }
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
                <button onClick={() => setAction('pay')}>Pay</button>
                <button onClick={() => setAction('refund')}>Refund</button>
                <button onClick={() => setAction('upgradePlan')}>Upgrade Plan</button>
                <button onClick={() => setAction('delete')}>Delete</button>
            </aside>
            {
                action === "pay" && (
                    <div className="incline-form">
                        <input type="number" id='number' name='amount' placeholder='Enter Amount' onChange={(e) => setAmount(e.target.value)} />
                        <input type="text" id='description' name='description' placeholder='(Optional)' />
                        <div className="incline-btns">
                            <button onClick={hanldePay}>Confirm Payment</button>
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                )
            }
            {
                action === "refund" && (
                    <div className="incline-form">
                        <input type="number" id='number' name='amount' placeholder='Enter Amount' onChange={(e) => setAmount(e.target.value)} />
                        <input type="text" id='description' name='description' placeholder='(Optional)' />
                        <div className="incline-btns">
                            <button onClick={handleRefund}>Confirm Refund</button>
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                )
            }


        </section>
    )
}

export default MembersCard