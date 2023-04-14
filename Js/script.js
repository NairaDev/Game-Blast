let main = document.getElementById("main")
let score = document.getElementById("score")
let steps = document.getElementById("steps")
let progress = document.getElementById("progress")
let coins = document.getElementById("coins")
let btnStart = document.querySelector(".start-button")
let gamePage = document.querySelector(".div_background")
let homePage = document.querySelector(".homepage")
let winPage = document.getElementsByClassName("win")[0]
let losePage = document.getElementsByClassName("lose")[0]
let pausePage = document.getElementsByClassName("pause")[0]
let currentCoins = document.getElementById("currentCoins")

btnStart.addEventListener("click", function() {
  homePage.style.display = "none";
  gamePage.style.display = "block";
})

function reload() {
  location.reload()
}

function pause(){
    gamePage.style.display = "none"
    pausePage.style.opacity = "1"
    pausePage.style.zIndex = "2"
}

function continueGame(){
    gamePage.style.display = "block"
    pausePage.style.opacity = "0"
    pausePage.style.zIndex = "-1"
}
class GameCanvas{
  constructor(){
      this.ctx = main.getContext("2d")
  }
}

class Matrix extends GameCanvas{
  constructor(){
      super()
      this.row = 10  /// N
      this.column = 10 //// M
      this.pointsToWin = 360  /// Points needed to win
      steps.innerText = 30    ///  Number of steps
      this.tileCount = 2     ///   How many tiles should be in order to be burned
      this.arr = []
      this.add()
      this.replaceBtn = document.getElementById("first_coin")
      this.replaceBtn.onclick = () => this.replace()
      this.firstBoost = false
      this.replaceArr = [] 
      this.timeMixed = 0
      this.downIsComplete = false
  }

  replace(){
    this.firstBoostActive = true
    for(let i = 0;i < this.arr.length;i++){
      for(let j = 0;j < this.arr[0].length;j++){
        if(this.arr[i][j].active){
          this.arr[i][j].active = false
          let color = this.arr[i][j].color
          let image = new Image()
          image.src = color + ".png"
          image.onload = () => {
              this.ctx.drawImage(image, this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
          }
        }
      }
    }
  }

  add(){
      for(let i = 0; i < this.row;i++){
          this.arr[i] = []
          for(let j = 0; j < this.column;j++){
              this.arr[i][j] = {
                  bool: true,
                  active: false,
                  x: j * Math.floor(500/this.column),
                  y: i * Math.floor(500/this.row)
              }
          }
      }
  }

  show(){
    let colors = ["blue","green","yelow","red","purple"]
      for(let i = 0; i < this.row;i++){
        for(let j = 0; j < this.column;j++){
          let image = new Image()
          let randNum = Math.floor(Math.random() * 5)
          image.src = colors[randNum] + ".png"
          image.onload = () => {
            if(this.arr[i][j].bool){
              this.ctx.drawImage(image, this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
              this.arr[i][j].color = colors[randNum]
            }
          }
        }
      }
  }

  rec(a,b,color){
    if (a < 0 || a > this.arr.length - 1 || b < 0 || b > this.arr[a].length - 1)
        return

    if(this.arr[a][b].active)
        return

    if(a == 0 || a == this.arr.length - 1 || b == 0 || b == this.arr[0].length - 1){
      if(a == 0 && b == this.arr[0].length - 1){
        if(this.arr[a + 1][b].color == color){
          if(this.arr[a][b].color == color)
              this.arr[a][b].active = true
        }
      }
      if(b == this.arr[0].length - 1){
        if(a != this.arr.length - 1 && a != 0)
          if(this.arr[a + 1][b].color == color || this.arr[a][b - 1].color == color || this.arr[a][a - 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true
      
        else if(a == this.arr.length - 1)
          if(this.arr[a - 1][b].color == color || this.arr[a][b - 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true

        else if(a == 0)
          if(this.arr[a + 1][b].color == color || this.arr[a][b - 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true
      }   
      if( a == 0){
        if(b != this.arr[0].length - 1 && b != 0)
          if(this.arr[a + 1][b].color == color || this.arr[a][b + 1].color == color || this.arr[a][b - 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true

        else if(b == this.arr[0].length - 1)
          if(this.arr[a + 1][b].color == color || this.arr[a][b - 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true

        else if(b == 0)
          if(this.arr[a + 1][b].color == color || this.arr[a][b + 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true
      } 
      if(b == 0){
        if(a != this.arr.length - 1 && a != 0)
          if(this.arr[a + 1][b].color == color || this.arr[a][b + 1].color == color || this.arr[a][a - 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true

        else if(a == this.arr.length - 1)
          if(this.arr[a - 1][b].color == color || this.arr[a][b + 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true

        else if(a == 0)
          if(this.arr[a + 1][b].color == color || this.arr[a][b + 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true
      }
      if(a == this.arr.length - 1){
        if(b != this.arr[0].length - 1 && b != 0)
          if(this.arr[a - 1][b].color == color || this.arr[a][b + 1].color == color || this.arr[a][b - 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true

        else if(b == this.arr[0].length - 1)
          if(this.arr[a - 1][b].color == color || this.arr[a][b - 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true

        else if(b == 0)
          if(this.arr[a - 1][b].color == color || this.arr[a][b + 1].color == color)
            if(this.arr[a][b].color == color)
              this.arr[a][b].active = true 
      }
    }
    else if(!(a == 0 && a == this.arr.length - 1 && b == 0 && b == this.arr[0].length - 1))
            if(this.arr[a - 1][b].color == color || this.arr[a + 1][b].color == color || this.arr[a][b + 1].color ==color || this.arr[a][b - 1].color == color)
              if(this.arr[a][b].color == color)
                this.arr[a][b].active = true

    else
        return

    if(!(a + 1 > this.arr.length - 1)){    
        if(this.arr[a + 1][b].color == color){
            this.rec(a + 1,b,color)
            this.arr[a][b].active = true
        }
    }
    if(!(a - 1 < 0)){
        if(this.arr[a - 1][b].color == color){
            this.rec(a - 1,b,color)
            this.arr[a][b].active = true
        }
    } 
    if(!(b + 1 > this.arr[0].length - 1)){
        if(this.arr[a][b + 1].color == color){
            this.rec(a,b + 1,color)
            this.arr[a][b].active = true
        } 
    }
    if(!(b - 1 < 0)){
        if(this.arr[a][b - 1].color == color){
            this.rec(a,b - 1,color)
            this.arr[a][b].active = true
        }
    }   
  }

  down(){
    for(let i = this.arr.length - 1;i >= 0;i--){
      for(let j = this.arr[0].length - 1; j >= 0;j--){
        if(!(this.arr[i][j].color)){
          let k = i - 1
          if(k == -1){
            if(this.downIsComplete){
              setTimeout(()=>{
                this.fill()
              },350)
              this.downIsComplete = false
            }
          }
          if(k >= 0){
            while(!(this.arr[k][j].color)){
              if(k > 0)
                k--
              else
                break
            }
            if(this.arr[k][j].color != false){
              let newImage = new Image()
              newImage.src = this.arr[k][j].color + ".png"
              let a = 0
              let b
              newImage.onload = () => {
              let falling = setInterval(()=>{
                this.ctx.clearRect(this.arr[i][j].x, b, Math.floor(500/this.column), Math.floor(500/this.row))
                this.ctx.drawImage(newImage, this.arr[i][j].x, this.arr[k][j].y + a, Math.floor(500/this.column), Math.floor(500/this.row))
                if(a >= this.arr[i][j].y - this.arr[k][j].y){
                  clearInterval(falling)
                }
                b = a
                a += Math.floor(500/this.row)
              },100)
            }
              this.arr[i][j].color = this.arr[k][j].color
              this.arr[i][j].active = false
              this.arr[k][j].color = false
              this.arr[k][j].active = false
              if(this.downIsComplete){
                setTimeout(()=>{
                  this.fill()
                },(i+1) * 150)
                this.downIsComplete = false
              }
            }
          }
        }
      }
    }
  }

  fill(){
    let colors = ["blue","green","yelow","red","purple"]
    for(let i = 0; i < this.arr.length;i++){
      for(let j = 0; j < this.arr[0].length;j++){
        if(this.arr[i][j].color == false){
          let a = Math.floor(500/this.column/5)
          let b = Math.floor(500/this.row/5)
          let c = Math.floor(500/this.column/2 - 500/this.column/10)
          let d = Math.floor(500/this.row/2 - 500/this.row/10)
          let image = new Image()
          let randNum = Math.floor(Math.random() * 5)
          image.src = colors[randNum] + ".png"
          image.onload = () => {
            let filling = setInterval(()=>{
              this.ctx.clearRect(this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
              this.ctx.drawImage(image, this.arr[i][j].x + c, this.arr[i][j].y + d, a, b)
              if(a >= 500/this.column - 5){
                this.ctx.clearRect(this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
                this.ctx.drawImage(image, this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column),  Math.floor(500/this.row))
                clearInterval(filling)
              }
              a += Math.floor(500/this.column/5)
              b += Math.floor(500/this.row/5)
              c -= Math.floor(500/this.column/10)
              d -= Math.floor(500/this.row/10)
            },10)
            this.arr[i][j].color = colors[randNum]
          }
        }
      }
    }
    setTimeout(()=>{
      let mix = true
        for(let i = 0;i < this.arr.length;i++){
          for(let j = 0; j < this.arr[0].length;j++){
            if(i != 0 && j != 0 && i != this.arr.length - 1 && j != this.arr[0].length - 1){
              if(this.arr[i][j].color == this.arr[i - 1][j].color || this.arr[i][j].color == this.arr[i][j - 1].color || this.arr[i][j].color == this.arr[i][j + 1].color || this.arr[i][j].color == this.arr[i + 1][j].color){
                mix = false
                return
              }
            }
            else if((i == 0) && (j != 0 && j != this.arr[0].length - 1)){
              if(this.arr[i][j].color == this.arr[i][j - 1].color || this.arr[i][j].color == this.arr[i][j + 1].color || this.arr[i][j].color == this.arr[i + 1][j].color){
                mix = false
                return
              }
            }
            else if((j == 0) && (i != 0 && i != this.arr.length - 1)){
              if((this.arr[i][j].color === this.arr[i][j + 1].color) || (this.arr[i][j].color === this.arr[i - 1][j].color) || (this.arr[i][j].color === this.arr[i + 1][j].color)){
                mix = false
                return
              }
            }
            else if((j == this.arr[0].length - 1) && (i != 0 && i != this.arr.length - 1)){
              if(this.arr[i][j].color == this.arr[i][j - 1].color || this.arr[i][j].color == this.arr[i - 1][j].color || this.arr[i][j].color == this.arr[i + 1][j].color){
                mix = false
                return
              }
            }
            else if((i == this.arr.length - 1) && (j != 0 && j != this.arr[0].length - 1)){
              if(this.arr[i][j].color == this.arr[i][j - 1].color || this.arr[i][j].color == this.arr[i][j + 1].color || this.arr[i][j].color == this.arr[i - 1][j].color){
                mix = false
                return
              }
            }
          }
        }
        if(mix == true){
          if(this.timeMixed == 1){
            setTimeout(()=>{
              gamePage.style.display = "none"
            },800)
              let loseText = document.getElementById("loseText")
              loseText.innerText = "You Can Not Make A Move"
              losePage.style.opacity = "1"
              losePage.style.zIndex = "2"
          }
          for(let i = 0;i < this.arr.length;i++){
            for(let j = 0;j < this.arr[0].length;j++){
              let a = Math.floor(500/this.column)
              let b = Math.floor(500/this.row)
              let c = 0
              let d = 0
              let newImage = new Image()
              newImage.src = this.arr[i][j].color + ".png"
              newImage.onload = () => {
              let filling = setInterval(()=>{
                this.ctx.clearRect(this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
                this.ctx.drawImage(newImage, this.arr[i][j].x + c, this.arr[i][j].y + d, a, b)
                if(a <= 0){
                this.ctx.clearRect(this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
                clearInterval(filling)
                }
                a -= Math.floor(500/this.column/5)
                b -= Math.floor(500/this.row/5)
                c += Math.floor(500/this.column/10)
                d += Math.floor(500/this.row/10)
                },50)
              }
            }
          }
        }
        setTimeout(()=>{
          let colors = ["blue","green","yelow","red","purple"]
          for(let i = 0; i < this.arr.length;i++){
            for(let j = 0; j < this.arr[0].length;j++){
              let a = Math.floor(500/this.column/5)
              let b = Math.floor(500/this.row/5)
              let c = Math.floor(500/this.column/2 - 500/this.column/10)
              let d = Math.floor(500/this.row/2 - 500/this.row/10)
              let image = new Image()
              let randNum = Math.floor(Math.random() * 5)
              image.src = colors[randNum] + ".png"
              image.onload = () => {
                let filling = setInterval(()=>{
                  this.ctx.clearRect(this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
                  this.ctx.drawImage(image, this.arr[i][j].x + c, this.arr[i][j].y + d, a, b)
                  if(a >= 500/this.column - 5){
                    this.ctx.clearRect(this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
                    this.ctx.drawImage(image, this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column),  Math.floor(500/this.row))
                    this.arr[i][j].color = colors[randNum]
                    clearInterval(filling)
                  }
                  a += Math.floor(500/this.column/5)
                  b += Math.floor(500/this.row/5)
                  c -= Math.floor(500/this.column/10)
                  d -= Math.floor(500/this.row/10)
                },10)
              }
            }
          }
          this.timeMixed++
        },500)
        setTimeout(()=>{
          this.fill()
        },600)
    },1000)
  }

  click(){
    let count = 0
    main.addEventListener('click', (event) => {
      let x = event.offsetX
      let y = event.offsetY
      let col = Math.floor(x / parseInt(500/this.column))
      let row = Math.floor(y / parseInt(500/this.row))
      let color = this.arr[row][col].color
      let actives = []
      
      if(this.firstBoostActive == true && count == 0){
        for(let i = 0;i < this.arr.length;i++){
          for(let j = 0;j < this.arr[i].length;j++){
            if(this.arr[i][j].active){
              this.arr[i][j].active = false
              let newImage = new Image()
                newImage.src = this.arr[i][j].color + ".png"
                newImage.onload = () => {
                this.ctx.drawImage(newImage, this.arr[i][j].x, this.arr[i][j].y, 500/this.column, 500/this.row)
              }
            }
          }
        }
        let newImage = new Image()
        newImage.src = this.arr[row][col].color + "Active.png"
        newImage.onload = () => {
          this.ctx.drawImage(newImage, this.arr[row][col].x, this.arr[row][col].y, 500/this.column, 500/this.row)
        }
        this.replaceArr = [row,col,color]
        count++
      }
      else if(this.firstBoostActive == true && count == 1){
        if((row == this.replaceArr[0] && col == this.replaceArr[1]) || this.arr[row][col].color == this.replaceArr[2]){
          return
        }
        let a = Math.floor(500/this.column)
        let b = Math.floor(500/this.row)
        let c = 0
        let d = 0
        let newImage = new Image()
        newImage.src = this.arr[row][col].color + ".png"
        newImage.onload = () => {
        let filling = setInterval(()=>{
          this.ctx.clearRect(this.arr[row][col].x, this.arr[row][col].y, Math.floor(500/this.column), Math.floor(500/this.row))
          this.ctx.drawImage(newImage, this.arr[row][col].x + c, this.arr[row][col].y + d, a, b)
          if(a <= 0){
          this.ctx.clearRect(this.arr[row][col].x, this.arr[row][col].y, Math.floor(500/this.column), Math.floor(500/this.row))
          clearInterval(filling)
          }
        a -= Math.floor(500/this.column/5)
        b -= Math.floor(500/this.row/5)
        c += Math.floor(500/this.column/10)
        d += Math.floor(500/this.row/10)
        },10)
      }
        let a1 = Math.floor(500/this.column)
        let b1 = Math.floor(500/this.row)
        let c1 = 0
        let d1 = 0
        let newImage1 = new Image()
        newImage1.src = this.arr[this.replaceArr[0]][this.replaceArr[1]].color + ".png"
        newImage1.onload = () => {
        let filling = setInterval(()=>{
          this.ctx.clearRect(this.arr[this.replaceArr[0]][this.replaceArr[1]].x, this.arr[this.replaceArr[0]][this.replaceArr[1]].y, Math.floor(500/this.column), Math.floor(500/this.row))
          this.ctx.drawImage(newImage1, this.arr[this.replaceArr[0]][this.replaceArr[1]].x + c1, this.arr[this.replaceArr[0]][this.replaceArr[1]].y + d1, a1, b1)
          if(a1 <= 0){
          this.ctx.clearRect(this.arr[this.replaceArr[0]][this.replaceArr[1]].x, this.arr[this.replaceArr[0]][this.replaceArr[1]].y, Math.floor(500/this.column), Math.floor(500/this.row))
          clearInterval(filling)
          }
          a1 -= Math.floor(500/this.column/5)
          b1 -= Math.floor(500/this.row/5)
          c1 += Math.floor(500/this.column/10)
          d1 += Math.floor(500/this.row/10)
          },10)
        setTimeout(()=>{
          let a2 = Math.floor(500/this.column/5)
          let b2 = Math.floor(500/this.row/5)
          let c2 = Math.floor(500/this.column/2 - 500/this.column/10)
          let d2 = Math.floor(500/this.row/2 - 500/this.row/10)
          let image = new Image()
          image.src = this.arr[this.replaceArr[0]][this.replaceArr[1]].color + ".png"
          image.onload = () => {
            let filling = setInterval(()=>{
              this.ctx.clearRect(this.arr[this.replaceArr[0]][this.replaceArr[1]].x, this.arr[this.replaceArr[0]][this.replaceArr[1]].y, Math.floor(500/this.column), Math.floor(500/this.row))
              this.ctx.drawImage(image, this.arr[this.replaceArr[0]][this.replaceArr[1]].x + c2, this.arr[this.replaceArr[0]][this.replaceArr[1]].y + d2, a2, b2)
              if(a2 >= 500/this.column - 5){
                this.ctx.clearRect(this.arr[this.replaceArr[0]][this.replaceArr[1]].x, this.arr[this.replaceArr[0]][this.replaceArr[1]].y, Math.floor(500/this.column), Math.floor(500/this.row))
                this.ctx.drawImage(image,this.arr[this.replaceArr[0]][this.replaceArr[1]].x, this.arr[this.replaceArr[0]][this.replaceArr[1]].y, Math.floor(500/this.column),  Math.floor(500/this.row))
                clearInterval(filling)
              }
              a2 += Math.floor(500/this.column/5)
              b2 += Math.floor(500/this.row/5)
              c2 -= Math.floor(500/this.column/10)
              d2 -= Math.floor(500/this.row/10)
            },10)
          }
        },50)
        
        setTimeout(()=>{
          let a3 = Math.floor(500/this.column/5)
          let b3 = Math.floor(500/this.row/5)
          let c3 = Math.floor(500/this.column/2 - 500/this.column/10)
          let d3 = Math.floor(500/this.row/2 - 500/this.row/10)
          let image1 = new Image()
          image1.src = this.arr[row][col].color + ".png"
          image1.onload = () => {
            let filling = setInterval(()=>{
              this.ctx.clearRect(this.arr[row][col].x, this.arr[row][col].y, Math.floor(500/this.column), Math.floor(500/this.row))
              this.ctx.drawImage(image1, this.arr[row][col].x + c3, this.arr[row][col].y + d3, a3, b3)
              if(a3 >= 500/this.column - 5){
                this.ctx.clearRect(this.arr[row][col].x, this.arr[row][col].y, Math.floor(500/this.column), Math.floor(500/this.row))
                this.ctx.drawImage(image1, this.arr[row][col].x, this.arr[row][col].y, Math.floor(500/this.column),  Math.floor(500/this.row))
                clearInterval(filling)
              }
              a3 += Math.floor(500/this.column/5)
              b3 += Math.floor(500/this.row/5)
              c3 -= Math.floor(500/this.column/10)
              d3 -= Math.floor(500/this.row/10)
            },10)
          }
        },50)
        
        this.arr[row][col].color = this.replaceArr[2]
        this.arr[this.replaceArr[0]][this.replaceArr[1]].color = color
        count = 0
        this.firstBoostActive = false
        coins.innerText = +(coins.innerText) - 5
        }
      }
      else if(this.arr[row][col].active){
        for(let i = 0;i < this.arr.length;i++){
            for(let j = 0;j < this.arr[i].length;j++){
              if(this.arr[i][j].active){
                actives.push(this.arr[i][j])
              }
            }
          }
        for(let i = 0;i < this.arr.length;i++){
          for(let j = 0;j < this.arr[i].length;j++){
            if(this.arr[i][j].active){
              if(actives.length > 1){
                this.downIsComplete = true
                let a = Math.floor(500/this.column)
                let b = Math.floor(500/this.row)
                let c = 0
                let d = 0
                let image = new Image()
                image.src = this.arr[i][j].color + ".png"
                image.onload = () => {
                let filling = setInterval(()=>{
                  this.ctx.clearRect(this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), Math.floor(500/this.row))
                  this.ctx.drawImage(image, this.arr[i][j].x + c, this.arr[i][j].y + d, a, b)
                  if(a <= 0){
                  this.ctx.clearRect(this.arr[i][j].x, this.arr[i][j].y, Math.floor(500/this.column), 500/this.row)
                  this.down()
                  clearInterval(filling)
                  }
                  a -= Math.floor(500/this.column/5)
                  b -= Math.floor(500/this.row/5)
                  c += Math.floor(500/this.column/10)
                  d += Math.floor(500/this.row/10)
                },10)
                this.arr[i][j].color = false
                this.arr[i][j].active = false
                }
              }
            }
          }
        }
        steps.innerText--
        if(steps.innerText == 0){
          setTimeout(()=>{
            gamePage.style.display = "none"
          },800)
            losePage.style.opacity = "1"
            losePage.style.zIndex = "2"
          
        }
        if(actives.length >= 4 && actives.length <= 6){
          score.innerText = +(score.innerHTML) + actives.length * 4
          currentCoins.innerText = +(currentCoins.innerText) + parseInt(actives.length/2)

        }
        else if(actives.length >= 7){
          score.innerText = +(score.innerHTML) + actives.length * 5
          currentCoins.innerText = +(currentCoins.innerText) + parseInt(actives.length/2)
        }
        else{
          score.innerText = +(score.innerHTML) + actives.length * 3
          currentCoins.innerText = +(currentCoins.innerText) + parseInt(actives.length/2)
        }
        progress.style.width = (score.innerText * 100 / this.pointsToWin) + "%"
        let progressLength = document.getElementsByClassName("parent_range")[0].clientWidth
        if(score.innerText >= this.pointsToWin){
          progress.style.width = 100 + "%"
          setTimeout(()=>{
            gamePage.style.display = "none"
          },800)
            let winText = document.getElementById("winText")
            winText.innerHTML += "<br>You Got " + currentCoins.innerText + " Coins" 
            winPage.style.opacity = "1"
            winPage.style.zIndex = "2"
        }
      }
        else{
          for(let i = 0;i < this.arr.length;i++){
            for(let j = 0;j < this.arr[i].length;j++){
              if(this.arr[i][j].active){
                this.arr[i][j].active = false
                let newImage = new Image()
                  newImage.src = this.arr[i][j].color + ".png"
                  newImage.onload = () => {
                  this.ctx.drawImage(newImage, this.arr[i][j].x, this.arr[i][j].y, 500/this.column, 500/this.row)
                }
            }
          }
          }
          this.rec(row,col,color)
          for(let i = 0;i < this.arr.length;i++){
            for(let j = 0;j < this.arr[i].length;j++){
              if(this.arr[i][j].active){
                actives.push(this.arr[i][j])
              }
            }
          }
          if(actives.length >= this.tileCount){
            for(let i = 0;i < this.arr.length;i++){
              for(let j = 0;j < this.arr[i].length;j++){
                if(this.arr[i][j].active){
                  let newImage = new Image()
                  newImage.src = this.arr[i][j].color + "Active.png"
                  newImage.onload = () => {
                  this.ctx.drawImage(newImage, this.arr[i][j].x, this.arr[i][j].y, 500/this.column, 500/this.row)
                  }
                }
              }
            }
          }
          else{
            for(let i = 0;i < this.arr.length;i++){
              for(let j = 0;j < this.arr[i].length;j++){
                if(this.arr[i][j].active){
                  this.arr[i][j].active = false
                }
              }
            }
          }
        }
      })
    }
  } 
  class GameController extends GameCanvas{
    constructor(){
      super()
      let matrix = new Matrix
      matrix.show()
      matrix.click()
      setTimeout(()=>{
        matrix.fill()
      },500)
      setTimeout(()=>{
        matrix.fill()
      },1500)
    }
  }

  let game = new GameController