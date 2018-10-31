/**
 * 这个Models 用来模拟数据提供。
 */

class Models{
    static deals(){
        // E               S                W                N
        // S.H.D.C
        return ['T76543.4.K72.863 QJ98.A5.J853.QT4 A2.Q986.AQT.KJ97 K.KJT732.964.A52', 
        'Q74.K963.J7.KQJ8 AJ52.J52.A2.AT95 986.AT74.KT85.62 KT3.Q8.Q9643.743',
        '986.J5.AJT93.KT7 Q2.A732.8642.J94 K3.KT8.Q75.A8653 AJT754.Q964.K.Q2',
        'A63.A954.AT4.Q52 QT84.QJ7.K832.AT J95.K862.J97.643 K72.T3.Q65.KJ987']
    }
    /**
     * 获得明手的牌，根据规则进行判断。
     * todo:正确的牌
     */
    static openDummy(){
        return {seat:'north',cards:'K.KJT732.964.A52'}
    }
    /**
     * 获得上一墩牌，这里应该进行必要的判断。不能随便获得。
     * [东，南，西，北]
     */
    static lastTrick(){
        return [{index:1,card:'7S'},
                {index:14,card:'9S'},
                {index:28,card:'2S'},
                {index:41,card:'KS'}]
    }
    static getResult(){
        return "N3D +2 NS 600";
    }
}

export default Models