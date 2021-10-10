import SparkMD5 from 'spark-md5'

export const md5File = file => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        let spark = new SparkMD5();
        fileReader.readAsBinaryString(file)
    
        // 文件读取完毕之后的处理
        fileReader.onload = (e) => {
          spark.appendBinary(e.target.result)
          let md5 = spark.end();
          resolve(md5);
        }
    })
    
}