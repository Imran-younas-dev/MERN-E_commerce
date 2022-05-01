module.exports = ErrorCatch => (req,res,next) =>{
                //   try                      catch
    Promise.resolve(ErrorCatch(req,res,next)).catch(next);

}