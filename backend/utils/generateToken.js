import jwt from 'jsonwebtoken';


function generateToken(data) {

  const userId = data._id || (data._doc && data._doc._id);
  const role = data.role || (data._doc && data._doc.role);

  const token = jwt.sign({ _id: userId, role }, process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return token;
}

export default generateToken;
