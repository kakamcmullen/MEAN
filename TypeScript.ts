var myNum: number = 5;
var myString: string = "Hello Universe";
var myArr: number[] = [1,2,3,4];
var myObj: object = { name:'Bill'};
var anythingVariable: any = "Hey";
var anythingVariable: any = 25; 
var arrayOne: any[] = [true, false, true, true]; 
var arrayTwo: any[] = [1, 'abc', true, 2];
var myObj: object = { x: 5, y: 10 };
// object constructor
class MyNode {
    private val: number;
    constructor( value: number) {
        this.val = value
    }
    newNode(){
        return this.val;
    }
}
let firstMyNode: MyNode;
firstMyNode = new MyNode(10);
console.log(firstMyNode.newNode());
