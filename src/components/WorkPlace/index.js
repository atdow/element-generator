import './index.less'
import {
    getElementAxis,
    getElementWidthAndHeight,
    judgePointInScale,
  } from "@/utils/scale";
export default {
    data() {
        return {
            // width: 0,
            // height: 0,
            // x: 0,
            // y: 0,
            new_component: null,
            materialComponents_moveIn_workPlace:false,
            components_array:[],
            componentsElement:[],
            workPlaceAxis:[]
        }
    },
    components: {},
    props: {},
    watch: {},
    created() { },
    mounted() {
        this.workPlaceAxis = getElementAxis(document.querySelector('.work-place'))
        this.$event.on("place_components", this.receiveComponent);
        this.$event.on("materialComponents_moveIn_workPlace", this.componentsInWorkPlace);
    },
    beforeDestroy() {
        this.$event.$off("place_components", this.receiveComponent);
        this.$event.$off("materialComponents_moveIn_workPlace", this.componentsInWorkPlace);
    },
    methods: {
        receiveComponent(info) {
           // console.log(info)  
            this.materialComponents_moveIn_workPlace = false
            info.axis = this.rectityComponentAxis(info)
            this.components_array.push(info)
            this.createElements(this.components_array)
        },
        componentsInWorkPlace(state){
            this.materialComponents_moveIn_workPlace = state;   
             
        },
        onResize: function (x, y, width, height) {
            // this.x = x;
            // this.y = y;
            // this.width = width;
            // this.height = height;
        },
        onDrag: function (x, y) {
            // this.x = x;
            // this.y = y;
            //  console.log(7777)
        },
        createElements(components_array){
            // console.log("components_array:",components_array)
            let element = []
            components_array.forEach((componentElement,index)=>{
                if(componentElement.type=='input'){
                    const input_component = (
                        <vue-draggable-resizable
                            class="test-input"
                            w={componentElement.width}
                            h={componentElement.height}
                            on-dragging={this.onDrag}
                            on-resizing={this.onResize}
                            parent={true}                         
                            x={componentElement.axis[0].x - this.workPlaceAxis[0].x}
                            y={componentElement.axis[0].y - this.workPlaceAxis[0].y}                 >
                            <el-input placeholder="请输入内容"></el-input>
                        </vue-draggable-resizable>
                    )
                    element.push(input_component)
                }
            })
            this.componentsElement = [...element]
        },
        // 调整组件的坐标
        rectityComponentAxis(componentInfo){
            // console.log(componentInfo)
            this.workPlaceAxis = getElementAxis(document.querySelector('.work-place'))
            
            let componentLeft = componentInfo.axis[0].x;
            let componentRight = componentInfo.axis[1].x;
            let componentTop = componentInfo.axis[0].y;
            let componentBottom = componentInfo.axis[3].y;

            let workPlaceLeft = this.workPlaceAxis[0].x;
            let workPlaceRight = this.workPlaceAxis[1].x;
            let workPlaceTop = this.workPlaceAxis[0].y;
            let workPlaceBottom = this.workPlaceAxis[3].y;

            let newAxis = [...componentInfo.axis]
            // I
            if(componentLeft < workPlaceLeft && componentRight > workPlaceLeft){
                // console.log("I")
                //  console.log(componentBottom,workPlaceBottom)
                if(componentTop < workPlaceTop && componentBottom > workPlaceTop){
                   // console.log(1)
                    newAxis = [
                        { 
                            x: this.workPlaceAxis[0].x, 
                            y: this.workPlaceAxis[0].y 
                        },
                        {
                            x: this.workPlaceAxis[0].x + componentInfo.width,
                            y: this.workPlaceAxis[0].y ,
                        },
                        {
                            x: this.workPlaceAxis[0].x,
                            y: this.workPlaceAxis[0].y + componentInfo.height,
                        },
                        {
                            x: this.workPlaceAxis[0].x + componentInfo.width,
                            y: this.workPlaceAxis[0].y + componentInfo.height,
                        },
                    ]
                    return newAxis
                }
                if(componentTop > workPlaceTop && componentBottom < workPlaceBottom){
                    //console.log(2)
                    newAxis = [
                        { 
                            x: this.workPlaceAxis[0].x, 
                            y: componentInfo.axis[0].y 
                        },
                        {
                            x: this.workPlaceAxis[0].x + componentInfo.width,
                            y: componentInfo.axis[1].y ,
                        },
                        {
                            x: this.workPlaceAxis[0].x,
                            y: componentInfo.axis[2].y ,
                        },
                        {
                            x: this.workPlaceAxis[0].x + componentInfo.width,
                            y: componentInfo.axis[3].y,
                        },
                    ]
                    return newAxis
                }
                if(componentTop < componentBottom && componentBottom > workPlaceBottom){
                    //console.log(3)
                    newAxis = [
                        { 
                            x: this.workPlaceAxis[2].x, 
                            y: this.workPlaceAxis[2].y - componentInfo.height
                        },
                        {
                            x: this.workPlaceAxis[2].x + componentInfo.width,
                            y: this.workPlaceAxis[2].y - componentInfo.height ,
                        },
                        {
                            x: this.workPlaceAxis[2].x,
                            y: this.workPlaceAxis[2].y,
                        },
                        {
                            x: this.workPlaceAxis[2].x + componentInfo.width,
                            y: this.workPlaceAxis[2].y,
                        },
                    ]
                    return newAxis
                }
            }
            // II
            if(componentLeft > workPlaceLeft && componentRight < workPlaceRight){
                // console.log("II")
                if(componentTop < workPlaceTop && componentBottom > workPlaceTop){
                    console.log(4)
                    newAxis = [
                        { 
                            x: componentInfo.axis[0].x, 
                            y: this.workPlaceAxis[0].y 
                        },
                        {
                            x: componentInfo.axis[1].x + componentInfo.width,
                            y: this.workPlaceAxis[0].y ,
                        },
                        {
                            x: componentInfo.axis[1].x,
                            y: this.workPlaceAxis[0].y + componentInfo.height,
                        },
                        {
                            x: componentInfo.axis[1].x + componentInfo.width,
                            y: this.workPlaceAxis[0].y + componentInfo.height,
                        },
                    ]
                    return newAxis
                }
                if(componentTop > workPlaceTop && componentBottom < workPlaceBottom){
                    //console.log(5)
                    return newAxis
                }
                if(componentTop < componentBottom && componentBottom > workPlaceBottom){
                    console.log(6)
                    newAxis = [
                        { 
                            x: componentInfo.axis[0].x, 
                            y: this.workPlaceAxis[2].y - componentInfo.height,
                        },
                        {
                            x: componentInfo.axis[1].x + componentInfo.width,
                            y: this.workPlaceAxis[2].y - componentInfo.height,
                        },
                        {
                            x: componentInfo.axis[1].x,
                            y: this.workPlaceAxis[2].y,
                        },
                        {
                            x: componentInfo.axis[1].x + componentInfo.width,
                            y: this.workPlaceAxis[2].y,
                        },
                    ]
                    return newAxis
                }
            }
            // III
            if(componentLeft > workPlaceLeft && componentRight > workPlaceRight){
               // console.log("III")
                if(componentTop < workPlaceTop && componentBottom > workPlaceTop){
                    //console.log(7)
                    newAxis = [
                        { 
                            x: this.workPlaceAxis[1].x - componentInfo.width, 
                            y: this.workPlaceAxis[1].y,
                        },
                        {
                            x: componentInfo.axis[1].x,
                            y: this.workPlaceAxis[1].y,
                        },
                        {
                            x: this.workPlaceAxis[1].x - componentInfo.width,
                            y: this.workPlaceAxis[1].y + componentInfo.height,
                        },
                        {
                            x: componentInfo.axis[1].x,
                            y: this.workPlaceAxis[1].y + componentInfo.height,
                        },
                    ]
                    return newAxis
                }
                if(componentTop > workPlaceTop && componentBottom < workPlaceBottom){
                    //console.log(8)
                    newAxis = [
                        { 
                            x: this.workPlaceAxis[1].x - componentInfo.width, 
                            y: componentInfo.axis[0].y,
                        },
                        {
                            x: componentInfo.axis[1].x,
                            y: componentInfo.axis[1].y,
                        },
                        {
                            x: this.workPlaceAxis[1].x - componentInfo.width,
                            y: componentInfo.axis[2].y,
                        },
                        {
                            x: componentInfo.axis[1].x,
                            y: componentInfo.axis[3].y,
                        },
                    ]
                    return newAxis
                }
                if(componentTop < componentBottom && componentBottom > workPlaceBottom){
                    //console.log(9)
                    newAxis = [
                        { 
                            x: this.workPlaceAxis[1].x - componentInfo.width, 
                            y: this.workPlaceAxis[3].y - componentInfo.height,
                        },
                        {
                            x: componentInfo.axis[1].x,
                            y: this.workPlaceAxis[3].y - componentInfo.height,
                        },
                        {
                            x: this.workPlaceAxis[1].x - componentInfo.width,
                            y: this.workPlaceAxis[3].y,
                        },
                        {
                            x: componentInfo.axis[1].x,
                            y: this.workPlaceAxis[3].y,
                        },
                    ]
                    return newAxis
                }
            }
            return componentInfo.axis
        }
    },

    render() {
        return (
            <div class={'work-place',this.materialComponents_moveIn_workPlace&&'activeBackground'} >
                {this.componentsElement}
            </div >
        )
    }
}
