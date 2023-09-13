<template>
    <button class="gotop" @click="gotop">返回首页</button>
    <div class="bigdata">
        <div class="frame"
             v-if="state.showAll">
            <div class="cardList">
                <el-card :class="state.url === file.path ? 'active card' : 'card'"
                         :body-style="{ padding: '0px' }"
                         v-for="file in state.fileList"
                         :key="file.path"
                         @click="clickFile(file)">
                    <img :src="file.img"
                         class="image" />
                    <div style="padding: 14px">
                        <span>{{ file.name }}</span>
                    </div>
                </el-card>
            </div>
        </div>
        <iframe class="frame"
                v-else
                :src="state.url"></iframe>
    </div>
</template>
  
<script lang="ts">
import { onMounted, reactive, ref } from 'vue'
export default {
    name: 'bigScreen',
    setup() {
        const list = ref([])
        const state = reactive({
            showAll: true,
            url: './html/example/index.html',
            fileList: [
                {
                    name: '通用模板',
                    path: './html/example/index.html',
                    img: './html/example/preview.png'
                },
                {
                    name: '智慧工地',
                    path: './html/smartsite/index.html',
                    img: './html/smartsite/preview.png'
                },
                {
                    name: '电子商务',
                    path: './html/e-Buniness/index.html',
                    img: './html/e-Buniness/preview.png'
                },
                {
                    name: '交通管控',
                    path: './html/traffic/index.html',
                    img: './html/traffic/preview.png'
                },
                {
                    name: '智慧旅游',
                    path: './html/travel/index.html',
                    img: './html/travel/preview.png'
                },
                {
                    name: '智慧天气',
                    path: './html/weather/index.html',
                    img: './html/weather/preview.png'
                },
                {
                    name: '智慧物联',
                    path: './html/IoT/index.html',
                    img: './html/IoT/preview.png'
                },
                {
                    name: '新能源车',
                    path: './html/vehicle/index.html',
                    img: './html/vehicle/preview.png'
                },
                {
                    name: '智慧物流',
                    path: './html/logistics/index.html',
                    img: './html/logistics/preview.png'
                },
                {
                    name: '环境监测',
                    path: './html/environment/index.html',
                    img: './html/environment/preview.png'
                },
                {
                    name: '舆情分析',
                    path: './html/opinion/public.html',
                    img: './html/opinion/preview.png'
                },
            ]
        })
        const gotop = () => {
            state.showAll = true
        }
        const clickFile = (file:any) => {
            state.url = file.path
            state.showAll = false
        }
        onMounted(() => {
            state.url = './html/example/index.html'
        })
        return {
            state,
            list,
            gotop,
            clickFile
        }
    }
}
</script>
  
<style lang="scss" scoped>
@media (min-width:800px) {
    .gotop{
        width: 32px;
        height: 60px;
        position: absolute;
        // z-index: 10000;
        color: white;
        background-color: rgb(10, 145, 145);
    }
    .bigdata {
        width: 85vw;
        height: calc(100vh - 65px);
        display: flex;


        .filelist {
            max-height: calc(100vh - 120px);
            overflow-y: auto;

            .cell {
                padding: 15px 5px;
                font-size: 20px;
                color: rgb(10, 145, 145);
                cursor: pointer;

                &.active {
                    color: rgb(0, 255, 255);
                }
            }
        }

        .cardList {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-content: center;

            .card {
                margin: 20px auto;

                .image {
                    width: 384px;
                    height: 216px;

                }

                &:hover {
                    box-shadow: 0 0 4px 4px rgb(10, 145, 145);
                }

                &.active {
                    box-shadow: 0 0 4px 4px rgb(10, 145, 145);
                    border: 2px solid rgb(0, 255, 255);
                }
            }
        }

        .frame {
            background-color: #000;
            width: calc(100vw);
            height: calc(100vh - 65px);
            border: medium none;
            overflow: auto;
        }
    }
}

@media (max-width:800px) {
    .bigdata {
        width: 85vw;
        height: calc(100vh - 65px);
        display: flex;
    }

    .gotop{
        width: 40px;
        height: 40px;
        position: absolute;
        z-index: 9999;
    }
    .filelist {
        max-height: calc(100vh - 90px);
        overflow-y: auto;

        .cell {
            padding: 15px 5px;
            font-size: 12px;
            color: rgb(10, 145, 145);
            cursor: pointer;

            &.active {
                color: rgb(0, 255, 255);
            }
        }
    }

    .cardList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: center;

        .card {
            margin: 10px auto;

            .image {
                width: 210px;
                height: 120px;

            }

            &:hover {
                box-shadow: 0 0 4px 4px rgb(10, 145, 145);
            }

            &.active {
                box-shadow: 0 0 4px 4px rgb(10, 145, 145);
                border: 2px solid rgb(0, 255, 255);
            }
        }
    }

    .frame {
        background-color: #000;
        width: calc(100vw);
        height: calc(100vh - 65px);
        border: medium none;
        overflow: auto;
    }
}
</style>
  