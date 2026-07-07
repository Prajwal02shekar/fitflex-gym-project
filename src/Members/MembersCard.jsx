import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { feeForPlan, PLANS } from '../utils/Plans'

const MembersCard = ({ member }) => {
    let [action, setAction] = useState(null);
    let [amount, setAmount] = useState('')
    let [description, setDescription] = useState('')
    let [newPlan, setNewPlan] = useState(member.memberPlan)
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
            type: "Refund",
            description: description || "Amount Refunded",
            amount: value,
            transaction: new Date().toLocaleString()
        })

        setAmount("")
        setDescription("")
        toast.success("Refund Success")
        setTimeout(() => {
            navigate('/members')
        }, 1000)
    }

    let handleReset = () => {
        setAction(null)
        setAction("")
        setDescription("")
    }

    let handleUpgrade = async () => {
        if (newPlan === member.memberPlan) {
            toast.error("Select a differnt plan")
            return
        }
        let updatedFee = feeForPlan(newPlan);
        await axios.patch(`http://localhost:3000/members/${member.id}`, {
            totalFee: updatedFee,
            memberPlan: newPlan
        })
        toast.success(`Plan upgraded to ${newPlan}`)
        handleReset();
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    let handleDelete = async () => {
        let confirmation = window.confirm(`Remove ${member.memberName} deletes complete details including payment history and ptrequests`)

        if (!confirmation) return

        try {
            let paymentRes = await axios.get('http://localhost:3000/payments')
            console.log(paymentRes)

            let reletedPayments = paymentRes.data.filter((f) => f.memberId === member.id)
            console.log(reletedPayments)

            for (let p of reletedPayments) {
                await axios.delete(`http://localhost:3000/payments/${p.id}`)
            }

            await axios.delete(`http://localhost:3000/members/${member.id}`)

            toast.success("Member Deleted")
            handleReset();
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (err) {
            console.log(err)
        }
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

            {
                action === "upgradePlan" && (
                    <div className="incline-form">
                        <select name="plan" id="plan" value={newPlan} onChange={(e) => setNewPlan(e.target.value)} >
                            {
                                PLANS.map((p) => {
                                    return (
                                        <option key={p.name} value={p.name}>{p.name}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="incline-btns">
                            <button onClick={handleUpgrade}>Confirm Upgrade</button>
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                )
            }


            {
                action === "delete" && (
                    <div className="incline-form">
                        <p>This Action will delete a member details incluing Payment and PT Requests</p>

                        <div className="incline-btns">
                            <button onClick={handleDelete}>Confirm Delete</button>
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                )
            }


        </section>
    )
}

export default MembersCard