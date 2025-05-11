import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewDonors() 
{
    const [donors, setDonors] = useState([]);
    const [error, setError] = useState("");

    const displayDonors = async () => 
    {
        try 
        {
            const response = await axios.get(`${config.url}/admin/viewalldonors`);
            setDonors(response.data);
        } 
        catch (err) 
        {
            setError("Failed to fetch donors data ... " + err.message);
        }
    };

    useEffect(() => {
        displayDonors();
    }, []);

    const deleteDonor = async (cid) => 
    {
        try 
        {
            const response = await axios.delete(`${config.url}/admin/deletedonor?cid=${cid}`);
            toast.success(response.data);  // show success toast
            displayDonors();           // refresh customer list
        } 
        catch (err) 
        {
            console.log(err);
            setError("Unexpected Error Occurred... " + err.message);
            toast.error("Deletion failed: " + err.message); // show error toast
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
                <u>View All Donors</u>
            </h3>

            <ToastContainer position="top-center" autoClose={4000} />

            {error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    {error}
                </p>
            ) : donors.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    No Donor Data Found
                </p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Mobile No</th>
                            <th>Location</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map((donor) => (
                            <tr key={donor.id}>
                                <td>{donor.id}</td>
                                <td>{donor.name}</td>
                                <td>{donor.gender}</td>
                                <td>{donor.dob}</td>
                                <td>{donor.email}</td>
                                <td>{donor.username}</td>
                                <td>{donor.mobileno}</td>
                                <td>{donor.location}</td>
                                <td>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteDonor(donor.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}