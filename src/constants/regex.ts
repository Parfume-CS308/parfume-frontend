const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/
const genderRegex = /^(male|female|other)$/

export { passwordRegex, genderRegex }
