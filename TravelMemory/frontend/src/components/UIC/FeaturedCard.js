import React from "react";
import { useNavigate } from "react-router-dom"

export default function FeaturedCard(props) {
    const navigate = useNavigate()
    const visitDetails = () => {
        navigate(`/experiencedetails/${props.id}`)
    }
  return (
    <div>
      <div class="card" style={{ marginBottom: "2%", marginTop: "2%"}}>
        <div class="card-header">Featured</div>
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">{props.tripType}</h6>
          <p class="card-text">
            {props.description}
          </p>
          <button class="btn btn-success" onClick={visitDetails}>
            More Details
          </button>
        </div>
      </div>
    </div>
  );
}
