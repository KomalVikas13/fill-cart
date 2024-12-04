import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ReviewForm = () => {
    const { profile } = useSelector(state => state.users);
    console.log(profile.user.userId);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('productId');
    // console.log(orderId);

    const [review, setReview] = useState({
        rating: 0,
        comment: "",
        productId: productId,
        userId: profile.user.userId
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleStarClick = (ratingValue) => {
        setReview({ ...review, rating: ratingValue });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (review.rating === 0) newErrors.rating = "Please select a rating.";
        if (!review.comment.trim()) newErrors.comment = "Comments are required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // {
    //     "rating" : 6,
    //     "comment" : "Very nice, good looking and comfortable",
    //     "userId" : 4,
    //     "productId" : 10
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Review Submitted: ", review);
            await axios.post('http://localhost:8080/user/review', review, {
                headers: { Authorization: `Bearer ${profile.token}` },
                withCredentials: true
            });
            setSubmitted(true);
            setReview({ rating: 0, comment: "" });
            setErrors({});
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Submit Your Review</h2>
                {submitted && (
                    <p className="text-green-600 font-semibold text-center mb-4">
                        Thank you for your feedback!
                    </p>
                )}
                <form onSubmit={handleSubmit} className="text-center">
                    {/* Rating Field */}
                    <div className="mb-4 flex flex-col items-center">
                        <div className="flex items-center">
                            <label className="text-gray-700 font-medium mr-2">Rating:</label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`cursor-pointer text-4xl ${review.rating >= star ? "text-yellow-500" : "text-gray-400"
                                            }`}
                                        onClick={() => handleStarClick(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                    </div>

                    {/* Comment Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Comments:</label>
                        <textarea
                            name="comment"
                            value={review.comment}
                            onChange={handleInputChange}
                            className="border rounded w-full p-2"
                            placeholder="Enter your comments"
                            rows="4"
                        ></textarea>
                        {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#fd6b68] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#e85b5a]"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;