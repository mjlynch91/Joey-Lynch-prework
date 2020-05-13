const studentNames = ['Bill', 'Bob', 'Joe'];
var i = 0;
for(i = 0; i < 3; i++){
    studentNames.push(prompt('Please enter another name:'));
}
for(i = 0; i < studentNames.length; i++){
    console.log(`${studentNames[i]}`);
}
