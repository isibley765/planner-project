module.exports = {
/* plan-tlbr-03-01 */
  updateTask: function(res, req, con) {
    var id = req.params.id;
    var title = req.body.title;
    var desc = req.body.description;
    
    con.query("UPDATE tasks SET title = ?, description = ? WHERE id = ?", [title, desc, id], function(err) {
      if(err)
        res.send(err);
      else
        res.send({ message: "Task updated" });
      return;
    });
  },

/* plan-head-02-01 */
  newPswd: function(res, req, con, crypto) {
    var id = req.body.id;
    var newpswd = crypto.createHash("md5").update(req.body.newpswd).digest("hex");
    
    con.query("UPDATE users SET pswd = ? WHERE id = ?", [newpswd, id], function(err) {
      if(err) {
        res.send(err);
      } else
        res.send({ message: "Password updated" });
      return;
    });
  }
}