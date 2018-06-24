import { Meteor } from 'meteor/meteor';

Meteor.publish("todos", function todoPublish(){
  return Todos.find({
    $or:[
      {private: {$ne: true}},
      {owner: this.userId}
    ]
  });
});


Meteor.methods({
  "todos.insert"(text, time){
    if(!this.userId){
      throw new Meteor.Error("Not-Authorized");
    }

    // Adds Todos to the Database and List
    Todos.insert({
      text, 
      time, 
      owner: Meteor.userId(), 
      username: Meteor.user().username
    });
  },
  "todos.setChecked"(id, setChecked){
    Todos.update(id, {$set:{checked: setChecked}});
  },
  "todos.remove"(id){
    if(todo.owner !== this.userId){
      throw new Meteor.Error("Unathorized");
    }

    Todos.remove(id);
  },
  "todos.setPrivate"(id, setToPrivate){
    const todo = Todos.findOne(id);

    if(todo.owner !== this.userId){
      throw new Meteor.Error("Unathorized");
    }

    Todos.update(id, {$set:{private: setToPrivate}});
  }
});
