package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cancellations")
public class Cancellation {

    @Id
    private String id;

    private String bookingId;
    private String reason;
    private double refundAmount;
    private String refundStatus;
    private String cancelledAt;
    private String expectedRefundDate;

    // ✅ GETTERS

    public String getId() { return id; }

    public String getBookingId() { return bookingId; }

    public String getReason() { return reason; }

    public double getRefundAmount() { return refundAmount; }

    public String getRefundStatus() { return refundStatus; }

    public String getCancelledAt() { return cancelledAt; }
    public String getExpectedRefundDate() { return expectedRefundDate; }

    // ✅ SETTERS

    public void setId(String id) { this.id = id; }

    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public void setReason(String reason) { this.reason = reason; }

    public void setRefundAmount(double refundAmount) { this.refundAmount = refundAmount; }

    public void setRefundStatus(String refundStatus) { this.refundStatus = refundStatus; }

    public void setCancelledAt(String cancelledAt) { this.cancelledAt = cancelledAt; }
    public void setExpectedRefundDate(String expectedRefundDate) { this.expectedRefundDate = expectedRefundDate; }
}