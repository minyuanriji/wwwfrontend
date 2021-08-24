import { getPlatform } from '@/common/request.js';
export default {
	getMapDistanceApi(lng1,lat1,lng2,lat2){	 //计算两点之间的距离
	    var radLat1 = lat1*Math.PI / 180.0;
	    var radLat2 = lat2*Math.PI / 180.0;
	    var a = radLat1 - radLat2;
	    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
	    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
	    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	    s = s *6378.137 ;// EARTH_RADIUS;
	    s = Math.round(s * 10000) / 10000;
	    
	    s = s * 1000
	    
	    if (isNaN(s)) {  
	        return 0;  
	    }	    
	    return s;
	},
	getLocationDataH5(){ //公众号定位
		let that=this
		if(getPlatform()=='wechat'){
			that.$wechatSdk.location(function(res){
			if(uni.getStorageSync('x-longitude')&&uni.getStorageSync('x-latitude')){
				 uni.setStorageSync('x-longitude-new',res.longitude)
				 uni.setStorageSync('x-latitude-new',res.latitude)
				 // var  countLO=that.getMapDistanceApi(uni.getStorageSync('x-longitude'),uni.getStorageSync('x-latitude'),res.longitude,res.latitude)					
				 // if((Math.floor(countLO/1000 * 100) / 100)>3){
					//  uni.showModal({
					//  	title: '提示',
					//  	content: "已经超出初次定位3公里，是否重新定位",
					//  	success: function(result) {
					//  		if (result.confirm) {
					// 			uni.setStorageSync('x-longitude',res.longitude)
					// 			uni.setStorageSync('x-latitude',res.latitude)
					//  			that.locationH5()
					//  		} else if (result.cancel) {
								
					//  		}
					//  	}
					//  })
				 // }else{
					
				 // }
			}else{
				uni.setStorageSync('x-longitude',res.longitude)
				uni.setStorageSync('x-latitude',res.latitude)
				uni.setStorageSync('flag',true)
			}
			})
		}else{
			that.locationMp()
		}
	},
	getLocationData(){  //微信或者APP定位
		var that=this
		uni.getLocation({
			type:'gcj02',
			success(res) {
				if(uni.getStorageSync('x-longitude')&&uni.getStorageSync('x-latitude')){
						uni.setStorageSync('x-longitude-new',res.longitude)
						uni.setStorageSync('x-latitude-new',res.latitude)
					 // var  countLO=that.getMapDistanceApi(uni.getStorageSync('x-longitude'),uni.getStorageSync('x-latitude'),res.longitude,res.latitude)					
					 // if((Math.floor(countLO/1000 * 100) / 100)>3){
						//  uni.showModal({
						//  	title: '提示',
						//  	content: "已经超出初次定位3公里，是否重新定位",
						//  	success: function(result) {
						//  		if (result.confirm) {									
						// 			uni.setStorageSync('x-longitude',res.longitude)
						// 			uni.setStorageSync('x-latitude',res.latitude)
						// 			that.locationMp()
						//  		} else if (result.cancel) {
									
						//  		}
						//  	}
						//  })
					 // }else{
						
					 // }
				}else{
					uni.setStorageSync('x-longitude',res.longitude)
					uni.setStorageSync('x-latitude',res.latitude)
					uni.setStorageSync('flag',true)
				}
			}
		})
	},
	locationH5(){
			this.getLocationDataH5()
			var time=(parseInt(new Date().getTime()/1000)+7200)-parseInt(new Date().getTime()/1000)
			let temp=setInterval(()=>{
				time--
				if(time<=0){
					this.getLocationDataH5()
					clearInterval(temp);
				}else{
								
				}
			},1000)			
	},
	locationMp(){	
			this.getLocationData()
			var time=(parseInt(new Date().getTime()/1000)+7200)-parseInt(new Date().getTime()/1000)
			let temp=setInterval(()=>{
				time--
				if(time<=0){
					this.getLocationData()
					clearInterval(temp);
				}else{
						
			}
			},1000)	  
	},				
}