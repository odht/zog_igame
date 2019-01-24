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
                    <p className={styles.aTitle}>智赛棋牌服务协议</p>                    
                    <div style={{width:'94%', height:'2px', marginLeft:'3%', backgroundColor:'white', marginBottom:'5px'}}></div>
                    <p>尊敬的智赛棋牌用户您好：</p>
                    <p>欢迎您加入智赛棋牌, 为使用智赛棋牌的服务，您应当阅读并遵守《智赛棋牌服务协议》（以下简称“本协议”）和<Link to='/user/userAgreement/accountRules'>《智赛棋牌账号规则》</Link>。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制智赛棋牌责任的条款、对用户权利进行限制的条款、约定争议解决方式和司法管辖的条款（如第十八条相关约定）等，以及开通或使用某项服务的单独协议或规则。限制、免责条款或者其他涉及您重大权益的条款可能以加粗、加下划线等形式提示您重点注意。</p>
                    <p><strong>除非您已充分阅读、完全理解并接受本协议所有条款，否则您无权使用智赛棋牌服务。您点击“同意”或“下一步”，或您使用智赛棋牌服务，或者以其他任何明示或者默示方式表示接受本协议的，均视为您已阅读并同意签署本协议。本协议即在您与智赛棋牌之间产生法律效力，成为对双方均具有约束力的法律文件。</strong></p>
                    <p><strong>如果您因年龄、智力等因素而不具有完全民事行为能力，请在法定监护人（以下简称"监护人"）的陪同下阅读和判断是否同意本协议，并特别注意未成年人使用条款。</strong></p>
                    <p><strong>如果您是中国大陆地区以外的用户，您订立或履行本协议还需要同时遵守您所属和/或所处国家或地区的法律。</strong></p>

                    <h3>一、【协议的范围】</h3>
                    <h4>1.1 本协议是用户与智赛棋牌之间关于其使用智赛棋牌的服务所订立的协议。“智赛棋牌”是指智赛棋牌和/或其相关服务可能存在的运营关联单位。“用户”是指智赛棋牌的服务的使用人，在本协议中更多地称为“您”。</h4>       
                    <h4>1.2 智赛棋牌的服务是指智赛棋牌向用户提供的，包括但不限于即时通讯、网络媒体、互联网增值、互动娱乐、金融支付、广告等产品及服务，具体服务以智赛棋牌实际提供的为准（以下简称“本服务”）。</h4>
                    <h4><strong> 1.3本协议内容同时包括《智赛棋牌账号规则》,且您在使用智赛棋牌某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”）。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。您对前述任何单独协议的接受，即视为您对本协议全部的接受。您对本协议的接受，即视为您对《智赛棋牌账号规则》的接受。</strong></h4>

                    <h3>二、【帐号与密码安全】</h3>
                    <h4>2.1 您在使用本服务时可能需要注册一个帐号。关于您使用帐号的具体规则，请仔细阅读并遵守相关单独协议。</h4>
                    <h4>2.2 智赛棋牌特别提醒您应妥善保管您的帐号和密码。当您使用完毕后，应安全退出。因您保管不善可能导致遭受被盗号或密码失窃，责任由您自行承担。</h4>
                    <h4><strong>2.3为增强用户体验和/或技术便利，本服务的帐号可能包括数字、字母或者其组合，以及手机号码、电子信箱等多种形式。在您注册某一形式的帐号时，智赛棋牌可能附赠该帐号的另一表现形式。具体的帐号形式、帐号体系及帐号之间的关联关系等，以智赛棋牌实际提供的为准。</strong></h4>
                    <h4>2.4您在使用本服务过程中，可能可以为您使用的帐号设置昵称、头像、签名、留言等信息。您应当保证这些信息的内容和形式符合法律法规（本协议中的“法律法规”指用户所属/所处地区、国家现行有效的法律、行政法规、司法解释、地方法规、地方规章、部门规章及其他规范性文件以及对于该等法律法规的不时修改和补充，以及相关政策规定等，下同。）、公序良俗、社会公德以及智赛棋牌平台规则，且不会侵害任何主体的合法权益。</h4>
                    <h4><strong>2.5部分第三方网站或者服务可能可以用智赛棋牌帐号等作为其登录途径之一。您知晓，除非智赛棋牌特别说明外，这些网站或者服务并非智赛棋牌运营，您应自行判断此类第三方网站或者服务的安全性和可用性，并自行承担相关风险和责任。</strong></h4>


                    <h3>三、【用户个人信息保护】</h3>
                    <p><strong>3.1 保护用户个人信息是智赛棋牌的一项基本原则。智赛棋牌将按照本协议及《智赛棋牌账号规则》的规定收集、使用、储存和分享您的个人信息。本协议对个人信息保护相关内容未作明确规定的，均应以《智赛棋牌账号规则》的内容为准。</strong></p>
                    <p>3.2 您在注册帐号或使用本服务的过程中，可能需要填写一些必要的信息。若国家法律法规有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整，则可能无法使用本服务或在使用过程中受到限制。</p>
                    <p>3.3一般情况下，您可根据相关产品规则浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务等）的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。</p>
                    <p>3.4智赛棋牌将尽可能运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>
                    <p><strong>3.5智赛棋牌不会将您的个人信息转移或披露给任何第三方，除非：</strong></p>
                    <p><strong>（1）相关法律法规或司法机关、行政机关要求。</strong></p>
                    <p><strong>（2）为完成合并、分立、收购或资产转让而转移。</strong></p>
                    <p><strong>（3）为提供您要求的服务所必需。</strong></p>
                    <p><strong>（4）依据《智赛棋牌账号规则》或其他相关协议规则可以转移或披露给任何第三方的情形。</strong></p>
                    <p>3.6智赛棋牌非常重视对未成年人个人信息的保护。若您不具备完全民事行为能力，在使用智赛棋牌的服务前，应事先取得您的监护人的同意。</p>
                    <h3>四、【关于本服务】</h3>
                    <h4>4.1 本服务的内容</h4>
                    <p>4.1.1 本服务是指是指智赛棋牌向用户提供的安装在终端设备上的具有游戏下载及使用、用户互动等功能的软件许可及服务（以下简称“本服务”），软件名为“智赛棋牌”。</p>
                    <p><strong>4.1.2 本软件中的游戏包括智赛棋牌游戏。</strong></p>
                    <h4>4.2 本服务的形式</h4>
                    <p>4.2.1 您使用本服务需要下载智赛棋牌软件，对于这些软件，智赛棋牌给予您一项个人的、不可转让及非排他性的许可。您仅可为访问或使用本服务的目的而使用这些软件及服务。</p>
                    <p>4.2.2 本服务中智赛棋牌软件提供包括但不限于Windows、Android、iOS等多个应用版本，用户必须选择与所安装终端设备相匹配的软件版本。</p>
                    <h4>4.3本服务许可的范围</h4>
                    <p>4.3.1智赛棋牌给予您一项个人的、不可转让及非排他性的许可，以使用本软件。您可以为非商业目的在单一终端设备上安装、使用、显示、运行本软件。 </p>
                    <p>4.3.2您可以为使用本软件及服务的目的用计算机可读形式制作本软件的一个副本，仅用作备份。备份副本必须包含原软件中含有的所有著作权信息。</p>
                    <p>4.3.3本条及本协议其他条款未明示授权的其他一切权利仍由智赛棋牌保留，您在行使这些权利时须另外取得智赛棋牌的书面许可。智赛棋牌如果未行使前述任何权利，并不构成对该权利的放弃。</p>


                    <h3>五、【软件的获取】</h3>
                    <p>5.1 您可以直接从智赛棋牌获取本软件，也可以从得到智赛棋牌授权的第三方获取。</p>
                    <p><strong>5.2 如果您从未经智赛棋牌授权的第三方获取本软件或与本软件名称相同的安装程序，智赛棋牌无法保证该软件能够正常使用，并对因此给您造成的损失不予负责。</strong></p>

                    <h3>六、【软件的安装与卸载】</h3>
                    <p><strong>6.1 智赛棋牌可能为不同的终端设备开发了不同的软件版本，您应当根据实际情况选择下载合适的版本进行安装，且您不得将本软件安装在未经智赛棋牌明示许可的其他终端设备上。由于您未正确安装合适的软件版本所带来的风险及损失，智赛棋牌不承担任何责任。</strong></p>
                    <p>6.2 下载安装程序后，您需要按照该程序提示的步骤正确安装。</p>
                    <p>6.3 为提供更加优质、安全的服务，在本软件安装时智赛棋牌可能推荐您安装其他软件，您可以选择安装或不安装。</p>
                    <p>6.4 如果您不再需要使用本软件或者需要安装新版软件，可以自行卸载。如果您愿意帮助智赛棋牌改进产品服务，请告知卸载的原因。</p>

                    <h3>七、【软件的更新】</h3>
                    <p>7.1 为了增进用户体验、完善服务内容，智赛棋牌将不断努力开发新的服务，并为您不时提供软件更新（这些更新可能会采取软件替换、修改、功能强化、版本升级等形式）。</p>
                    <p>7.2 为了改善用户体验，并保证服务的安全性和功能的一致性，智赛棋牌有权不经向您特别通知而对软件进行更新，或者对软件的部分功能效果进行改变或限制。</p>
                    <p>7.3 本软件新版本发布后，旧版本的软件可能无法使用。智赛棋牌不保证旧版本软件继续可用及相应的客户服务，请您随时核对并下载最新版本。</p>
                    <h3>八、【使用本服务的方式】</h3>
                    <p>8.1 本服务仅为您个人非商业性质的使用，除非您与智赛棋牌另有约定。</p>
                    <p>8.2 您依本协议条款所取得的权利不可转让。</p>
                    <p>8.3 您不得使用任何方式（包括但不限于第三方软件、插件、外挂、系统、设备等）对本服务进行干扰、破坏、修改或施加其他影响。</p>
                    <p>8.4 您应当通过智赛棋牌提供或认可的方式使用本服务，不得通过任何第三方软件、插件、外挂、系统、设备等登录或使用本服务。</p>
                    <p>8.5 任何人未经智赛棋牌授权不得使用任何第三方软件、插件、外挂、系统等查看、获取本服务中所包含的智赛棋牌、智赛棋牌合作伙伴或用户的任何相关信息、数据等内容，同时，应当严格遵守智赛棋牌发布的Robots协议等相关协议规则。</p>
                    
                    <h3>九、【按现状提供服务】</h3>
                    <p><strong> 9.1本服务是按照现有技术和条件所能达到的现状提供的。智赛棋牌会尽最大努力保障服务的连贯性和安全性，但智赛棋牌不能随时预见和防范法律、技术以及其他风险，智赛棋牌对此类风险在法律允许的范围内免责，包括但不限于不可抗力、病毒、木马、黑客攻击、系统不稳定、第三方服务瑕疵、政府行为等原因可能导致的服务中断、数据丢失以及其他的损失和风险。</strong></p>
                    <p><strong>9.2因经营策略安排或调整等原因,不同地区的用户可使用的具体智赛棋牌服务的内容可能会存在差异，具体以智赛棋牌实际提供的为准。</strong></p>
                    
                    <h3>十、【自备设备】</h3>
                    <p>10.1您应当理解，您使用本服务需自行准备与相关服务有关的终端设备（如电脑、移动终端和必要的网络接入设备等装置），并承担所需的费用（如电话费、上网费等费用）。</p>
                    <p>10.2您理解并同意，您使用本服务时会耗用您的终端设备和带宽等资源。</p>
                    <h3>十一、【用户个人信息保护】</h3>
                    <p>11.1 保护用户个人信息是智赛棋牌的一项基本原则，智赛棋牌将会采取合理的措施保护用户的个人信息。智赛棋牌对相关信息采用专业加密存储与传输方式，保障用户个人信息的安全。</p>
                    <p>11.2 智赛棋牌将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>
                    <p>11.3 您在使用本服务的过程中，可能需要使用一些必要的信息，例如：为了提供更优质的终端资源管理服务，需要您提供、展示移动终端设备型号或名称以完成设备对接、适配等；为了更好的提升用户互动体验以及提供应用推荐服务等，可能需要提供您所在的地理位置以实现产品功能。为了向您提供与好友互动正在玩儿的应用等服务，可能会获取您终端设备上部分应用程序的使用信息并可能会向您的好友展示，如您无需使用该服务的，您可自行关闭。若国家法律法规或政策有特殊规定的，您需要提供真实的身份信息。若您不提供或提供的信息不完整，则无法使用本服务或在使用过程中受到限制。</p>
                    <p>11.4 未经您的同意，智赛棋牌不会向智赛棋牌以外的任何公司、组织和个人披露您的个人信息，但法律法规另有规定的除外。</p>
                    <p>11.5 智赛棋牌非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用智赛棋牌的服务前，应事先取得您家长或法定监护人的书面同意。</p>
                    <p><strong>11.6 如果您通过本软件下载使用非智赛棋牌运营的游戏，您可能在使用该游戏的过程中会向该游戏的开发者披露您的个人信息，智赛棋牌提醒您在披露您的个人信息时谨慎决定。</strong></p>

                    <h3>十二、【主权利义务条款】</h3>
                    <h4>12.1账号使用规范</h4>
                    <p>12.1.1 智赛棋牌的账户即您的个人帐户。应使用您拥有合法使用权的智赛棋牌账号，并遵守《智赛棋牌账号规则》、《智赛棋牌软件许可及服务协议》及相关协议、规则等的约束。 同时，您承担以前述全部智赛棋牌账号为标识进行的全部行为的法律责任。 </p>
                    <p>12.1.2您应当做好账号和密码的保密措施。 因您保密措施不当或您的其他行为，致使上述口令、密码等丢失或泄漏所引起的一切损失和后果，均由您自行承担。 当在您怀疑他人在使用您的帐号时，您应立即通知智赛棋牌公司。</p>
                    <h4>12.2用户注意事项</h4>
                    <p>12.2.1 您理解并同意：为了向您提供有效的服务，您在此许可智赛棋牌利用您电脑及移动通讯终端的处理器和带宽等资源。本软件使用过程中可能产生数据流量的费用，用户需自行向运营商了解相关资费信息，并自行承担相关费用。</p>
                    <p>12.2.2 您在使用本软件某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”），您在使用该项服务前请阅读并同意相关的单独协议；您使用前述特定服务，即视为你接受相关单独协议。</p>
                    <p><strong>12.2.3 用户在使用本软件及服务时，须自行承担如下包括但不限于智赛棋牌不可掌控的风险内容：</strong></p>
                    <p><strong>12.2.3.1 由于不可抗拒因素引起的个人信息丢失、泄漏等风险；</strong></p>
                    <p><strong>12.2.3.2 用户在使用本软件访问第三方网站或应用（如非智赛棋牌游戏）时遇到内容质量及安全问题等，均由用户自行承担。</strong></p>
                    <p><strong>12.2.3.3 由于网络信号不稳定、网络带宽小等原因，所引起的智赛棋牌同步登录失败、资料同步不完整、页面打开速度慢等风险；</strong></p>
                    <p><strong>12.2.3.4 用户必须选择与所安装终端设备相匹配的软件版本，否则，由于软件与终端设备型号不相匹配所导致的任何问题或损害，均由用户自行承担；</strong></p>
                    <h4>12.3第三方产品和服务</h4>
                    <p>12.3.1 您在使用本软件第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的用户协议。智赛棋牌和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。</p>
                    <p><strong>12.3.2 因用户使用本软件或要求智赛棋牌提供特定服务时，本软件可能会调用第三方系统或通过第三方支持用户的使用或访问（如非智赛棋牌游戏等），使用或访问的结果由该第三方提供，智赛棋牌不保证通过第三方系统提供的服务及内容或支持实现的结果的安全性、准确性、有效性及其他不确定的风险，由此若引发的任何争议及损害，与智赛棋牌无关，智赛棋牌不承担任何责任。智赛棋牌不对任何非智赛棋牌游戏的合法性、安全性、适用性及稳定性等作出保证，亦不对非智赛棋牌游戏承担任何责任。</strong></p>
                    <h3>十三、【广告】</h3>
                    <p><strong>13.1您同意智赛棋牌可以自行或由第三方通过短信、电子邮件或电子信息等多种方式向您发送、展示广告或其他信息（包括商业与非商业信息），广告或其他信息的具体发送及展示形式、频次及内容等以智赛棋牌实际提供为准。</strong></p>
                    <p><strong>13.2智赛棋牌将依照相关法律法规要求开展广告业务。您同意，对本服务中出现的广告，您应审慎判断其真实性和可靠性，除法律明确规定外，您应对因该广告而实施的行为负责。</strong></p>
                    
                    
                    <h3>十四、【服务费用】</h3>
                    <p>14.1智赛棋牌的部分服务是以收费方式提供的，如您使用收费服务，请遵守相关的协议。</p>
                    <p>14.2智赛棋牌可能根据实际需要对收费服务的收费标准、方式进行修改和变更，智赛棋牌也可能会对部分免费服务开始收费。前述修改、变更或开始收费前，智赛棋牌将在相应服务页面进行通知或公告。如果您不同意上述修改、变更或付费内容，则应停止使用该服务。</p>
                    <p>14.3在智赛棋牌降低收费服务的收费标准或者将收费服务改为免费服务提供时，智赛棋牌保留不对原付费用户提供退费或者费用调整之权利。</p>
                    
                    <h3>十五、【第三方提供的产品或服务】</h3>
                    <p><strong>您在智赛棋牌平台上使用第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的用户协议。智赛棋牌和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。</strong></p>
                    
                    <h3>十六、【基于软件提供服务】</h3>
                    <p>16.1 您在使用本服务的过程中可能需要下载软件，对于这些软件，智赛棋牌给予您一项个人的、不可转让及非排他性的许可。您仅可为使用本服务的目的而使用这些软件。</p>
                    <p>16.2 为了改善用户体验、保障服务的安全性及产品功能的一致性等目的，智赛棋牌可能会对软件进行更新。您应该将相关软件更新到最新版本，否则智赛棋牌并不保证软件或服务能正常使用。</p>
                    <p>16.3 智赛棋牌可能为不同的终端设备开发不同的软件版本，您应当根据实际情况选择下载合适的版本进行安装。您可以直接从智赛棋牌平台上获取软件，也可以从得到智赛棋牌授权的第三方获取。如果您从未经智赛棋牌授权的第三方获取软件或与软件名称相同的安装程序，智赛棋牌无法保证该软件或服务能够正常使用，并对因此给您造成的损失不予负责。</p>
                    <p><strong>除非智赛棋牌书面许可，您不得从事下列任一行为：</strong></p>
                    <p>（1）删除软件及其副本上关于著作权的信息。</p>
                    <p>（2）对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现软件的源代码。</p>
                    <p>（3）对智赛棋牌拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等。</p>
                    <p>（4）对软件或者软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经智赛棋牌授权的第三方工具/服务接入软件和相关系统。</p>
                    <p>（5）通过修改或伪造软件运行中的指令、数据等任何方式，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的。</p>
                    <p>（6）通过非智赛棋牌开发、授权的第三方软件、插件、外挂、系统、设备等任何方式，登录或使用智赛棋牌软件及服务，或制作、发布、传播非智赛棋牌开发、授权的用于登录或使用智赛棋牌软件及服务的第三方软件、插件、外挂、系统、设备等。</p>
                    
                    <h3>十七、【知识产权声明】</h3>
                    <p>17.1智赛棋牌在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表、计算机软件等）的知识产权归智赛棋牌所有，用户在使用本服务中所产生内容的知识产权归用户或相关权利人所有，除非您与智赛棋牌另有约定。</p>
                    <p>17.2除另有特别声明外，智赛棋牌提供本服务时所依托软件的著作权、专利权及其他知识产权均归智赛棋牌所有。</p>
                    <p>17.3智赛棋牌在本服务中所使用商业标识，其著作权或商标权归智赛棋牌所有。</p>
                    <p>17.4上述及其他任何本服务包含的内容的知识产权均受到法律法规保护，未经智赛棋牌、用户或相关权利人书面许可，任何人不得以任何形式进行使用或创造相关衍生作品。</p>

                    <h3>十八、【用户违法违规行为】</h3>
                    <p>18.1您在使用本服务时须遵守法律法规，不得制作、复制、发布、传播含有下列内容的信息或从事相关行为，也不得为制作、复制、发布、传播含有下列内容的信息或从事相关行为提供便利：</p>
                    <p>（1）反对宪法所确定的基本原则的。</p>
                    <p>（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的。</p>
                    <p>（3）损害国家荣誉和利益的。</p>
                    <p>（4）煽动民族仇恨、民族歧视，破坏民族团结的。</p>
                    <p>（5）破坏国家宗教政策，宣扬邪教和封建迷信的。</p>
                    <p>（6）散布谣言，扰乱社会秩序，破坏社会稳定的。</p>
                    <p>（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的。</p>
                    <p>（8）侮辱或者诽谤他人，侵害他人合法权益的。</p>
                    <p>（9）违反法律法规底线、社会主义制度底线、国家利益底线、公民合法权益底线、社会公共秩序底线、道德风尚底线和信息真实性底线的“七条底线”要求的。</p>
                    <p>（10）相关法律法规或本协议、相关协议、规则等禁止的。</p>
                    <p>18.2如果您在使用本服务过程中违反了相关法律法规或本协议约定，相关国家机关或机构可能会对您提起诉讼、罚款或采取其他制裁措施，并要求智赛棋牌给予协助。<strong>因此给您或者他人造成损害的，您应自行承担全部责任，智赛棋牌不承担任何责任。</strong></p>
                    <p><strong>18.3如果您违反本协议约定，智赛棋牌有权进行独立判断并采取相应措施，包括但不限于通过技术手段删除、屏蔽相关内容或断开链接等。同时，智赛棋牌有权视用户的行为性质，采取包括但不限于暂停或终止向您提供服务，限制、中止、冻结或终止您对智赛棋牌帐号的使用，追究法律责任等措施。</strong></p>
                    <p>18.4您违反本协议约定，导致任何主体损失的，您应当独立承担责任；智赛棋牌因此遭受损失的，您也应当一并赔偿。</p>
                    
                    
                    <h3>十九、【遵守当地法律监管】</h3>
                    <p>19.1您在使用本服务过程中应当遵守当地相关的法律法规，并尊重当地的道德和风俗习惯。如果您的行为违反了当地法律法规或道德风俗，您应当为此独立承担责任。</p>
                    <p> 19.2您应避免因使用本服务而使智赛棋牌违反法律法规或卷入政治和公共事件，否则智赛棋牌有权暂停或终止对您的服务。</p>
                    
                    <h3>二十、【用户发送、传播的内容与投诉处理】</h3>
                    <p> 20.1您通过本服务发送或传播的内容（包括但不限于网页、文字、图片、音频、视频、图表等）均由您自行承担责任。</p>
                    <p>20.2您发送或传播的内容应有合法来源，相关内容为您所有或您已获得必要的授权。</p>
                    <p>20.3如果您发送或传播的内容违法违规或侵犯他人权利的，智赛棋牌有权进行独立判断并采取删除、屏蔽或断开链接等措施。</p>
                    <p>20.4如您被他人投诉或您投诉他人，智赛棋牌有权将争议中相关方的主体信息、联系方式、投诉相关内容等必要信息提供给相关当事方或相关部门，以便及时解决投诉纠纷，保护各方合法权益。</p>
                    <p>20.5您保证对您在投诉处理程序中提供的信息、材料、证据等的真实性、合法性、有效性负责。</p>
                    
                    <h3>二十一、【不可抗力及其他免责事由】</h3>
                    <p>
                        <strong>21.1您理解并同意，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务受到影响。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，智赛棋牌将努力在第一时间与相关单位配合，争取及时进行处理，但是由此给您造成的损失智赛棋牌在法律允许的范围内免责。</strong>
                    </p>
                    <p>
                        <strong>21.2在法律允许的范围内，智赛棋牌对以下情形导致的服务中断或受阻不承担责任：</strong>
                    </p>
                    <p>
                        <strong>（1）受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏。</strong>
                    </p>
                    <p>
                        <strong>（2）用户或智赛棋牌的电脑软件、系统、硬件和通信线路出现故障。</strong>
                    </p>
                    <p>
                        <strong>（3）用户操作不当或用户通过非智赛棋牌授权的方式使用本服务。</strong>
                    </p>
                    <p>
                        <strong>（4）程序版本过时、设备的老化和/或其兼容性问题。</strong>
                    </p>
                    <p>
                        <strong>（5）其他智赛棋牌无法控制或合理预见的情形。</strong>
                    </p>
                    <p>
                        <strong>21.3您理解并同意，在使用本服务的过程中，可能会遇到网络信息或其他用户行为带来的风险，智赛棋牌不对任何信息的真实性、适用性、合法性承担责任，也不对因侵权行为给您造成的损害负责。这些风险包括但不限于：</strong>
                    </p>
                    <p>
                        <strong>（1）来自他人匿名或冒名的含有威胁、诽谤、令人反感或非法内容的信息。</strong>
                    </p>
                    <p>
                        <strong>（2）遭受他人误导、欺骗或其他导致或可能导致的任何心理、生理上的伤害以及经济上的损失。</strong>
                    </p>
                    <p>
                        <strong>（3）其他因网络信息或用户行为引起的风险。</strong>
                    </p>
                    <p>
                        <strong>21.4智赛棋牌依据本协议约定获得处理违法违规内容的权利，该权利不构成智赛棋牌的义务或承诺，智赛棋牌不能保证及时发现违法行为或进行相应处理。</strong>
                    </p>
                    <p>
                        <strong>21.5在任何情况下，您不应轻信借款、索要密码或其他涉及财产的信息。涉及财产操作的，请一定先核实对方身份，并请经常留意智赛棋牌有关防范诈骗犯罪的提示。</strong>
                    </p>

                    <h3>二十二、【协议的生效与变更】</h3>
                    <p>
                        <strong>22.1您使用本服务即视为您已阅读本协议并接受本协议的约束。</strong>
                    </p>
                    <p>
                        <strong>22.2智赛棋牌有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的协议条款。</strong>
                    </p>
                    <p>
                        <strong>22.3本协议条款变更后，如果您继续使用智赛棋牌提供的软件或服务，即视为您已接受变更后的协议。</strong>
                    </p>

                    <h3>二十三、【服务的变更、中断、终止】</h3>
                    <p>
                        <strong>23.1您理解并同意，智赛棋牌基于经营策略的调整，可能会对服务内容进行变更，也可能会中断、中止或终止服务。</strong>
                    </p>
                    <p>
                        <strong>23.2在智赛棋牌发生合并、分立、收购、资产转让时，智赛棋牌可向第三方转让本服务下相关资产；智赛棋牌也可在单方通知您后，将本协议下部分或全部服务及相应的权利义务转交由第三方运营或履行。具体受让主体以智赛棋牌通知的为准。</strong>
                    </p>
                    <p>
                        <strong>23.3如发生下列任何一种情形，智赛棋牌有权不经通知而中断或终止向您提供服务：</strong>
                    </p>
                    <p>
                        <strong>（1）根据法律法规规定您应提交真实信息，而您提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明。</strong>
                    </p>
                    <p>
                        <strong>（2）您违反相关法律法规的规定或违反本协议的约定。</strong>
                    </p>
                    <p>
                        <strong>（3）按照法律法规规定，司法机关或主管部门的要求。</strong>
                    </p>
                    <p>
                        <strong>（4）出于安全的原因或其他必要的情形</strong>。
                    </p>
                    <p>
                        23.4智赛棋牌有权按本协议8.2条的约定进行收费。若您未按时足额付费，智赛棋牌有权中断、中止或终止提供服务。
                    </p>
                    <p>
                        23.5您有责任自行备份存储在本服务中的数据。如果您的服务被终止，智赛棋牌有权从服务器上永久地删除您的数据,法律法规另有规定的除外。服务中止或终止后，智赛棋牌没有义务向您提供或返还数据。
                    </p>

                    <h3>二十四、【管辖与法律适用】</h3>
                    <p>
                        <strong>24.1本协议的成立、生效、履行、解释及纠纷解决等相关事宜，均适用中华人民共和国大陆地区法律（不包括冲突法）。</strong>
                    </p>
                    <p>
                        <strong>24.2本协议签订地为中华人民共和国广东省深圳市南山区。</strong>
                    </p>
                    <p>
                        <strong>24.3若您和智赛棋牌之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。</strong>
                    </p>
                    <p>
                        24.4本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。
                    </p>
                    <p>
                        24.5本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。
                    </p>
                    <p>
                        24.6若本协议有中文、英文等多个语言版本，相应内容不一致的，均以中文版的内容为准。
                    </p>

                    <h3>二十五、【未成年人使用条款】</h3>
                    <p>
                        25.1若用户未满18周岁，则为未成年人，应在监护人监护、指导下阅读本协议和使用本服务。
                    </p>
                    <p>
                        25.2未成年人用户涉世未深，容易被网络虚像迷惑，且好奇心强，遇事缺乏随机应变的处理能力，很容易被别有用心的人利用而又缺乏自我保护能力。因此，未成年人用户在使用本服务时应注意以下事项，提高安全意识，加强自我保护：
                    </p>
                    <p>
                        （1）认清网络世界与现实世界的区别，避免沉迷于网络，影响日常的学习生活。
                    </p>
                    <p>
                        （2）填写个人资料时，加强个人保护意识，以免不良分子对个人生活造成骚扰。
                    </p>
                    <p>
                        （3）在监护人或老师的指导下，学习正确使用网络。
                    </p>
                    <p>
                        （4）避免陌生网友随意会面或参与联谊活动，以免不法分子有机可乘，危及自身安全。
                    </p>
                    <p>
                        25.3监护人、学校均应对未成年人使用本服务多做引导。特别是家长应关心子女的成长，注意与子女的沟通，指导子女上网应该注意的安全问题，防患于未然。
                    </p>
                    <p>
                        25.4已满18周岁的成年人因任何原因不具备完全民事行为能力的，参照适用本协议之未成年人使用条款之相关约定。
                    </p>

                    <h3>二十六、【其他】</h3>
                    <p>
                        26.1如果您对本协议或本服务有意见或建议，可与智赛棋牌客户服务部门联系，我们会给予您必要的帮助。（正文完）
                    </p>
                    <p className={styles.author}>智赛棋牌</p>
                    <div style={{textAlign:'center'}}>
                        <Link to='/user/userAgreement/accountRules'>
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