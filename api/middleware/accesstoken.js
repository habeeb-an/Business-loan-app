// async function checkAccessToken(req, res, next) {
//     try {
//       // Check if the user has a valid access token in their session
//       const  access_token  = req.session.tokenSet.access_token;

//       if (!access_token) {
//         return res.status(401).json({ error: 'Unauthorized token or token not exist' });
//       }
  
//       // Pass the access token to the next middleware 
//       req.session.tokenSet.access_token = access_token;
//       next();
//     } catch (error) {
//       console.error('Error checking access token:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

//   module.exports=checkAccessToken