module.exports.signUpErrors = (err) => {
    let errors = { name: "", email: "", password: "" };
  
    if (err.message.includes("name"))
      errors.name = "name incorrect ou déjà pris";
  
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit faire 6 caractères minium";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
      errors.name = "Ce name est déjà pris";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };