
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


    get(key){
        const hashKey=hash(key);
        for(let i=0; i<this.buckets[hashKey % this.buckets.length].length; i++){
            if (this.buckets[hashKey % this.buckets.length][i].key==key){
                return(this.buckets[hashKey % this.buckets.length][i].value);
            }
        }
        return(null)
    }

    has(key){
        const hashKey=hash(key);
        for(let i=0; i<this.buckets[hashKey % this.buckets.length].length; i++){
            if (this.buckets[hashKey % this.buckets.length][i].key==key){
                return(true);
            }
        }
        return(false)
    }

    remove(key){
        const hashKey=hash(key);
        if (this.has(key)){
            this.buckets[hashKey % this.buckets.length]=this.buckets[hashKey % this.buckets.length].filter(function(e) { return e.key != key; });
            this.entriesNumber--;
            return(true);
        }
        else{
            return(false);
        }
    }

    length(){
        return(this.entriesNumber);
    }

    clear(){
        if (this.entriesNumber>0){
            for(let i=0; i<this.buckets.length; i++){
                this.buckets[i]=[];
            }
            this.entriesNumber=0;
        }
    }

    keys(){
        let keys=[]
        if (this.entriesNumber>0){
            for(let i=0; i<this.buckets.length; i++){
                if(this.buckets[i].length>0){
                    for(let j=0; j<this.buckets[i].length; j++){
                        keys.push(this.buckets[i][j].key);
                    }
                }
            }
        }
        return(keys);
    }

    values(){
        let values=[];
        if (this.entriesNumber>0){
            for(let i=0; i<this.buckets.length; i++){
                if(this.buckets[i].length>0){
                    for(let j=0; j<this.buckets[i].length; j++){
                        values.push(this.buckets[i][j].value);
                    }
                }
            }
        }
        return(values);
    }

    entries(){
        let entries=[];
        if (this.entriesNumber>0){
            for(let i=0; i<this.buckets.length; i++){
                if(this.buckets[i].length>0){
                    for(let j=0; j<this.buckets[i].length; j++){
                        entries.push([this.buckets[i][j].key,this.buckets[i][j].value]);
                    }
                }
            }
        }
        return(entries);
    }

}


const test = new hashMap();




