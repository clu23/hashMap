
function hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
 
    return hashCode;
  } 

class hashMap {
    constructor(){
        this.capacity=16;
        this.loadFactor=0.75;
        this.entriesNumber=0;
        this.buckets=[];
        for (let i=0; i<this.capacity; i++){
            this.buckets.push([]);
        }
        
    }

    set(key,value){
        const hashKey=hash(key);
        let present=false;
        for (let i=0; i<this.buckets[hashKey % this.buckets.length].length; i++){
            if (key==this.buckets[hashKey % this.buckets.length][i].key){
                this.buckets[hashKey % this.buckets.length][i].value=value;
                present=true;
            }
        }
        if (present==false){
            this.buckets[hashKey % this.buckets.length].push({key,value});
            this.entriesNumber++;
        }
        if (this.entriesNumber>this.capacity*this.loadFactor){
            this.extend();
        }

    }


    extend(){
        this.capacity=this.capacity*2;
        let newBuckets=[];
        for (let i=0; i<this.capacity; i++){
            newBuckets.push([]);
        }
        for (let i=0; i<this.buckets.length; i++){
            for (let j=0; j<this.buckets[i].length; j++){
                newBuckets[hash(this.buckets[i][j].key) % newBuckets.length].push({key : this.buckets[i][j].key, value : this.buckets[i][j].value});
            }
        }
        this.buckets=newBuckets;
    }

}


a = new hashMap();

a.set("Poires", 72)
a.set("Pommes", 28);
a.set("Pommes", 42)

console.log(hash("Poires")% 16)
console.log(hash("Poires")% 32)

console.log(a.buckets);

a.extend()

console.log(a)

