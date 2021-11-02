import BookingForm from './BookingForm';

exports.bookingForm = () => {
    return new BookingForm()
}

exports.responses = () => {
    const responseDict = {
        "Internal Server Error": 500,
        "OK": 200,
        "Created": 201
    }
    return responseDict;
}
