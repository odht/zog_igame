import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import 'antd/dist/antd.css';
import { Link } from 'dva/router';


class UserAgreement extends Component{


    render(){

        return(
            <React.Fragment>
                <div style={{height:'10px',backgroundColor:'transparent'}}></div>
                <div className={styles.agreementBox}>
                    <p className={styles.aTitle}>智赛棋牌账号规则</p>                    
                    <div style={{width:'94%', height:'2px', marginLeft:'3%', backgroundColor:'white', marginBottom:'5px'}}></div>
                    <p>尊敬的智赛棋牌用户您好：</p>
                    <p><strong>为有效利用智赛棋牌号码资源，维护用户合法权益，特制订《智赛棋牌号码规则》（以下简称“本规则”），同时您应当阅读并遵守<Link to='/user/userAgreement'>《智赛棋牌服务协议》</Link>。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制智赛棋牌责任的条款、对用户权利进行限制的条款、约定争议解决方式和司法管辖的条款等，以及开通或使用某项服务的单独协议或规则。限制、免责条款或者其他涉及您重大权益的条款可能以加粗、加下划线等形式提示您重点注意。</strong></p>
                    <p><strong>除非您已充分阅读、完全理解并接受本规则所有条款，否则您无权申请、使用智赛棋牌号码及相关服务。您点击“同意”或“下一步”，或您申请、使用智赛棋牌号码及相关服务的行为或者以其他任何明示或者默示方式表示接受本规则的，均视为您已阅读并同意签署本规则。本规则即在您与智赛棋牌之间产生法律效力，成为对双方均具有约束力的法律文件。</strong></p>
                    <p><strong>如果您因年龄、智力等因素而不具有完全民事行为能力，请在法定监护人（以下简称"监护人"）的陪同下阅读和判断是否同意本协议。</strong></p>
                    <p><strong>如果您是中国大陆地区以外的用户，您订立或履行本规则的行为需要同时遵守您所属和/或所处国家或地区的法律。</strong></p>


                    <h3>一、【协议的范围】</h3>
                    <h4>1.1 协议适用主体范围</h4>
                    <p>本规则是智赛棋牌制定的关于获取和使用智赛棋牌号码的相关规则。本规则适用于智赛棋牌提供的需要注册或使用智赛棋牌号码的全部软件和服务。</p>
                    <h4>1.2 协议关系及冲突条款</h4>
                    <p>本规则内容同时包括《智赛棋牌服务协议》（链接地址：#），上述内容一经正式发布即为本规则不可分割的组成部分，您同样应当遵守。</p>
                    <p>本协议内容同时包括智赛棋牌可能不断发布的关于本服务的相关协议、业务规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。</p>
                    <h4>1.3 您通过智赛棋牌号码使用智赛棋牌的软件和服务时，须同时遵守各项服务的单独协议。</h4>


                    <h3>二、【智赛棋牌号码的性质】</h3>
                
                    <p> 智赛棋牌号码是智赛棋牌按照本规则授权注册用户用于登录、使用智赛棋牌的软件或服务的数字标识，其所有权属于智赛棋牌。</p>


                    <h3>三、【智赛棋牌号码的获取】</h3>
                    <p>3.1 您可以通过如下方式免费或有偿申请注册智赛棋牌号码，包括但不限于（具体方式以智赛棋牌官方实际提供为准）：</p>
                    <p>（1）软件客户端；</p>
                    <p>（2）智赛棋牌网站；</p>
                    <p>（3）手机短信；</p>
                    <p>（4）其他智赛棋牌授权的方式。</p>
                    <p>3.2 您完成申请注册程序后，智赛棋牌按照本规则授权您为登录、使用智赛棋牌的软件或服务，或者智赛棋牌明确许可的其他目的，依照智赛棋牌的业务规则使用该号码。</p>
                    <p>3.3 任何主体通过任何方式使用任何智赛棋牌号码的，均受本规则约束。</p>
                    <p>>3.4 为改善用户体验和/或提供技术便利，智赛棋牌服务的帐号可能包括数字、字母或者其组合，以及手机号码、电子信箱等多种形式。在您注册某一形式的帐号时，智赛棋牌可能附赠该帐号的另一表现形式。具体的帐号形式、帐号体系及帐号之间的关联关系等，以智赛棋牌实际提供的为准。</p>

                    <h3>四、【用户身份信息验证】	</h3>
                    <p><strong>4.1 您在申请智赛棋牌号码过程中，需要填写一些必要的信息，请保持这些信息的及时更新，以便智赛棋牌向您提供帮助，或更好地为您提供服务。若国家法律法规（本协议中的“法律法规”指用户所属/所处地区、国家现行有效的法律、行政法规、司法解释、地方法规、地方规章、部门规章及其他规范性文件以及对于该等法律法规的不时修改和补充，以及相关政策规定等，下同。）有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整或不准确，则可能无法使用服务或在使用过程中受到限制。</strong></p>
                    <p>4.2 智赛棋牌与用户一同致力于个人信息的保护，保护用户个人信息是智赛棋牌的一项基本原则。未经您的同意，智赛棋牌不会向智赛棋牌以外的任何公司、组织或个人披露您的个人信息，但法律法规另有规定的除外。</p>      

                    <h3>五、【智赛棋牌号码的使用】</h3>
                    <p>5.1 您可以按照智赛棋牌的业务规则用智赛棋牌号码登录和使用智赛棋牌提供的各种软件和服务。</p>
                    <p>5.2 除了智赛棋牌提供的软件和服务，您可能还可以用智赛棋牌号码登录使用第三方网站或者服务。您知晓并同意，除非智赛棋牌特别说明外，这些网站或者服务并非智赛棋牌运营。您应自行判断此类第三方网站或者服务的安全性和可用性，并自行承担相关风险和责任。服务。</p>
                    <p>5.3 若您注册的智赛棋牌号码长期没有登录或使用，智赛棋牌有权将智赛棋牌号码进行回收处理，您将无法再继续使用相应号码。</p>

                    <h3>六、【智赛棋牌号码的安全】</h3>
                    <p>6.1 账号密码由您自行设定。您应妥善保管您的智赛棋牌号码与密码，并对以此智赛棋牌号码和密码实施的所有活动及其后果承担责任。</p>
                    <p>6.2 智赛棋牌与您共同负有维护智赛棋牌号码安全的责任。智赛棋牌会采取并不断更新技术措施，努力保护您的智赛棋牌号码在服务器端的安全。</p>
                    <p>6.3 您须采取必要措施保护您的号码安全，包括但不限于妥善保管智赛棋牌号码与密码、安装防病毒木马软件、定期更改密码等措施。</p>
                    <p>6.4 除前述各条款约定外，用户还须妥善保管与智赛棋牌号码及其密码相关的任何数字证书、手机动态口令或验证码、账户绑定的手机号码等一切信息和设备。如用户更换、暂停或终止使用上述信息和/或设备，或遗失或泄露前述信息和/或设备的，用户应及时采取必要措施，以减少可能发生的损失。您知晓并同意，因上述原因所致损失需由您本人承担。</p>

                    <h3>七、【主权利义务条款】</h3>
                    <h4>7.1账号使用规范</h4>
                    <p>7.1.1 智赛棋牌的账户即您的个人帐户。应使用您拥有合法使用权的智赛棋牌账号，并遵守《智赛棋牌账号规则》相关协议、规则等的约束。 同时，您承担以前述全部智赛棋牌账号为标识进行的全部行为的法律责任。 </p>
                    <p>7.1.2您应当做好账号和密码的保密措施。 因您保密措施不当或您的其他行为，致使上述口令、密码等丢失或泄漏所引起的一切损失和后果，均由您自行承担。 当在您怀疑他人在使用您的帐号时，您应立即通知智赛棋牌公司。</p>
                    <h4>7.2用户注意事项</h4>
                    <p>7.2.1 您理解并同意：为了向您提供有效的服务，您在此许可智赛棋牌利用您电脑及移动通讯终端的处理器和带宽等资源。本软件使用过程中可能产生数据流量的费用，用户需自行向运营商了解相关资费信息，并自行承担相关费用。</p>
                    <p>7.2.2 您在使用本软件某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”），您在使用该项服务前请阅读并同意相关的单独协议；您使用前述特定服务，即视为你接受相关单独协议。</p>
                    <p><strong>7.2.3 用户在使用本软件及服务时，须自行承担如下包括但不限于智赛棋牌不可掌控的风险内容：</strong></p>
                    <p><strong>7.2.3.1 由于不可抗拒因素引起的个人信息丢失、泄漏等风险；</strong></p>
                    <p><strong>7.2.3.2 用户在使用本软件访问第三方网站或应用（如非智赛棋牌游戏）时遇到内容质量及安全问题等，均由用户自行承担。</strong></p>
                    <p><strong>7.2.3.3 由于网络信号不稳定、网络带宽小等原因，所引起的智赛棋牌同步登录失败、资料同步不完整、页面打开速度慢等风险；</strong></p>
                    <p><strong>7.2.3.4 用户必须选择与所安装终端设备相匹配的软件版本，否则，由于软件与终端设备型号不相匹配所导致的任何问题或损害，均由用户自行承担；</strong></p>
                    <h4>7.3第三方产品和服务</h4>
                    <p>7.3.1 您在使用本软件第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的用户协议。智赛棋牌和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。</p>
                    <p><strong>7.3.2 因用户使用本软件或要求智赛棋牌提供特定服务时，本软件可能会调用第三方系统或通过第三方支持用户的使用或访问（如非智赛棋牌游戏等），使用或访问的结果由该第三方提供，智赛棋牌不保证通过第三方系统提供的服务及内容或支持实现的结果的安全性、准确性、有效性及其他不确定的风险，由此若引发的任何争议及损害，与智赛棋牌无关，智赛棋牌不承担任何责任。智赛棋牌不对任何非智赛棋牌游戏的合法性、安全性、适用性及稳定性等作出保证，亦不对非智赛棋牌游戏承担任何责任。</strong></p>

                    <h3>八、【用户行为规范】</h3>
                    <h4>8.1您不得恶意注册、获取智赛棋牌号码。恶意注册、获取智赛棋牌号码的情形包括但不限于：</h4>
                    <p>（1）通过智赛棋牌提供的或者明确许可的软件或服务以外的任何软件或者服务注册、获取智赛棋牌号码；或者通过任何软件或服务以非人工、非手动方式注册智赛棋牌号码；或者频繁、批量注册、获取智赛棋牌号码。</p>
                    <p>（2）为超出正常好友或用户交流沟通的目的而注册或使用智赛棋牌号码，包括但不限于为发送骚扰信息、垃圾信息、广告、诈骗信息或实现违法违规目的等注册、获取或使用智赛棋牌号码。</p>
                    <p>（3）通过盗号方式获取智赛棋牌号码或从盗号者处获得智赛棋牌号码。</p>
                    <p>（4）其他通过非智赛棋牌明确许可的方式或目的注册、获取或使用智赛棋牌号码的行为。</p>
                    <p>（5）若经过智赛棋牌独立判断，认为您使用的智赛棋牌号码是恶意注册、获取的号码，智赛棋牌有权对相应智赛棋牌号码采取限制、中止或终止使用等措施。</p>
                    <h4>8.2 智赛棋牌根据本规则对智赛棋牌号码的使用授权，仅限于初始申请注册人。未经智赛棋牌许可，初始申请注册人不得赠与、借用、租用、转让或售卖智赛棋牌号码或者以其他方式许可其他主体使用智赛棋牌号码。</h4>

                    <h4>8.3如果您当前使用的智赛棋牌号码并不是您初始申请注册的或者不是通过智赛棋牌提供的其他途径获得的，您不得用该号码登录或进行任何操作，并请您在第一时间通知智赛棋牌或者该号码的初始申请注册人。</h4>

                    <h3>九、【责任承担】</h3>
                    <p>9.1 您理解并同意，您应承担您智赛棋牌号码项下所有活动产生的全部责任。</p>
                    <p>9.2因智赛棋牌原因导致您的智赛棋牌号码被盗，智赛棋牌将依法承担相应责任。非因智赛棋牌原因导致的，您应自行承担相关法律责任和损失。</p>
                    <p>9.3 为免产生纠纷，您不得有偿或无偿转让智赛棋牌号码。否则，您应当自行承担由此产生的任何责任，同时智赛棋牌保留追究上述行为人法律责任的权利。</p>

                    <h3>十、【智赛棋牌号码使用的限制、冻结或终止】</h3>
                    <p>10.1 如您违反相关法律法规、本规则或其他相关协议、规则，智赛棋牌有权限制、中止、冻结或终止您对智赛棋牌号码的使用，且根据实际情况决定是否恢复您对智赛棋牌号码的使用。</p>
                    <p>10.2 如果智赛棋牌发现您并非号码初始申请注册人，智赛棋牌有权在未经通知的情况下终止您使用该号码。</p>
                    <p>10.3 智赛棋牌按照本规则、相关法律法规或其他相关协议、规则，对您采取限制、中止、冻结或终止您对智赛棋牌号码的使用等措施，而由此给您带来的损失（包括但不限于通信中断，用户资料、邮件和虚拟财产及相关数据、增值服务、产品或服务等的清空或无法使用等损失），由您自行承担。</p>
                    <h3>十一、【帐号安全保护】</h3>
                    <p> 为了保护您的智赛棋牌帐号的安全，使您可以更加安全地使用本服务，智赛棋牌可能会不断升级、完善我们的安全技术防护措施，若智赛棋牌根据自己的判断认为您的帐号可能存在被盗号等风险时，为了保护您的账户安全、财产免受损失等，可能会采取向您发出一定的提示、暂时冻结您对号码的使用等措施。您应该按照智赛棋牌的提示或指引进行操作，以降低您帐号被盗的风险或恢复您对帐号的使用。</p>

                    <h3>十二、【客户服务】</h3>
                    <p><strong>如果您对智赛棋牌采取的智赛棋牌号码的限制、冻结或终止等任何措施有异议或在使用智赛棋牌号码的过程中有其他问题的，均可联系智赛棋牌客户服务部门，我们会给予您必要的帮助。</strong></p>
                
                    <h3>十三、【其他】</h3>
                    <p>>13.1 您申请或使用智赛棋牌号码及相关服务即视为您已阅读并同意受本规则的约束。智赛棋牌有权在必要时修改本规则条款。您可以在智赛棋牌相关页面查阅本规则的最新版本。本规则条款变更后，如果您继续使用智赛棋牌号码及相关服务，即视为您已接受变更后的规则。</p>
                    <p>13.2 本规则签订地为中华人民共和国广东省深圳市南山区。</p>
                    <p> 13.3 本规则的成立、生效、履行、解释及纠纷解决等相关事宜，均适用中华人民共和国大陆地区法律（不包括冲突法）。</p>
                    <p>13.4 若您和智赛棋牌之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本规则签订地（即广东省深圳市南山区）有管辖权的人民法院管辖。</p>
                    <p>13.5 本规则所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本规则涵义解释的依据。</p>
                    <p>13.6 本规则条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。 </p>
                    <p>13.7 若本协议有中文、英文等多个语言版本，相应内容不一致的，均以中文版的内容为准。（正文完）</p>

                    <h3>十四、【关于通知】</h3>
                    <p>14.1 智赛棋牌可能会以网页公告、网页提示、电子邮箱、手机短信、常规的信件传送、您注册的本服务帐户的管理系统内发送站内信等方式中的一种或多种，向您送达关于本服务的各种规则、通知、提示等信息，该等信息一经智赛棋牌采取前述任何一种方式公布或发送，即视为送达，对您产生约束力。若您不接受的，请您书面通知智赛棋牌，否则视为您已经接受、同意。</p>
                    <p>14.2 若您有事项需要通知智赛棋牌的，应当按照本服务对外正式公布的联系方式书面通知智赛棋牌。</p>

                    <h3>十五、【其他】</h3>
                    <p>15.1 <strong>您下载、安装、使用本软件即视为您已阅读并同意受本协议的约束。</strong>智赛棋牌有权在必要时修改本协议条款。您可以在本软件的最新版本中查阅相关协议条款。本协议条款变更后，如果您继续使用本软件，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用本软件。</p>
                    <p><strong>15.3 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</strong></p>
                    <p><strong>15.4 若您和智赛棋牌之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。</strong></p>
                    <p>15.5 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
                    <p>15.6 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。（正文完）</p>

                    <p className={styles.author}>智赛棋牌</p>
                    <div style={{textAlign:'center'}}>
                        <Link to='/user/register'>
                            <Button className={styles.finishButton}>阅读完毕</Button>
                        </Link>
                    </div>
                </div>
                <div style={{height:'10px',backgroundColor:'transparent'}}></div>
            </React.Fragment> 
                    
        )
    }
}

export default UserAgreement;