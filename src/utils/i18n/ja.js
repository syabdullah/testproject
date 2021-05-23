export default {
  translation: {
    "OrderList.Header.Title": "マイオーダーリスト",
    "OrderList.Input.Search": "オーダー番号...",
    "OrderList.Label.Status": "Spocket の状態でのフィルタリング",

    "order.status.unpaid": "未払い",
    "order.status.paid": "支払い済み",
    "order.status.processing": "処理中",
    "order.status.shipped": "発送済み",
    "order.status.cancelled": "キャンセル済み",
    "order.status.pending": "保留中",
    "order.status.partially_paid": "一部支払い済み",
    "order.status.partially_refunded": "一部返金済み",
    "order.status.refunded": "返金済み",
    "order.status.voided": "無効",
    "order.status.authorized": "承認済み",
    "order.status.deleted": "削除済み",
    "order.status.pending_payment_confirmation": "保留中",

    "OrderList.Label.DownloadHistory": "すべてのオーダー履歴をCSV形式でダウンロード",
    "OrderList.Document.Title": "オーダー - Spocket分",
    "OrderList.EmptyOrders.Link.SearchProducts": "商品を検索する",
    "OrderList.EmptyOrders.Tip.HowToProcessOrders": "オーダーの処理方法",
    "OrderList.EmptyOrders.Message.Loading.Title": "オーダーが読み込まれています！",
    "OrderList.EmptyOrders.Message.Loading.Description": "オーダーが読み込まれるまでお待ちください。",
    "OrderList.EmptyOrders.Message.Title": "オーダーリストは空です！",
    "OrderList.EmptyOrders.Message.Description":
      "ここでオーダーの管理および処理ができます。検索ページに移動して、インポートリストへの商品の追加を開始します。",
    "OrderList.CheckBox.SelectAllOrders": "すべてのオーダーを選択",
    "OrderList.CheckBox.SelectedXOrders": "{{count}}オーダーが選択されました",
    "OrderList.CheckBox.SelectedXOrders_plural": "{{count}}オーダーが選択されました",
    "OrderList.CheckBox.BulkCheckoutOrders": "一括チェックアウト注文",
    "OrderList.CheckBox.BulkCheckoutOrders_plural": "一括チェックアウト注文",

    "RefreshModal.Button.SynchronizeOrders": "注文を同期する",
    "RefreshModal.Button.Cancel": "キャンセルする",
    "RefreshModal.Button.Synchronize": "同期する",
    "RefreshModal.Modal.Body":
      "注文はストアから自動的に同期されます。注文情報がない場合や更新されていない場合にのみ同期します。30秒後にページを更新してください。",

    "Order.Label.OrderNumber": "注文番号",
    "Order.Label.Date": "日付",
    "Order.Label.OrderStatus": "{{integrationName}} 注文ステータス",
    "Order.Table.Th.Product": "商品",
    "Order.Table.Th.Qty": "数量",
    "Order.Table.Th.UnitPrice": "単価",
    "Order.Table.Th.CheckoutDate": "チェックアウト日",
    "Order.Table.Th.Action": "アクション",

    "CustomerModal.Button.ViewCustomerInfo": "顧客情報を見る",
    "CustomerModal.Modal.Title.CustomerInfo": "顧客情報",
    "CustomerModal.Modal.Body.CustomerInfo": "顧客情報",
    "CustomerModal.Modal.Body.Address": "住所",

    "OrderLine.Button.Checkout": "チェックアウト",
    "OrderLine.Tooltip.PreviewInvoice": "請求書のプレビュー",
    "OrderLine.Tooltip.PaymentReceipt": "領収書",
    "OrderLine.Tooltip.TrackOrder": "注文の追跡",
    "OrderLine.Tooltip.OrderProcessing": "注文の処理",
    "OrderLine.Tooltip.OrderCancelled": "注文がキャンセルされました",
    "OrderLine.Tooltip.PleaseConfirm": "クリックしてご注文の支払いを確認してください",
    "OrderLine.Label.PurchaseEtsy": "Etsyで購入",
    "OrderLine.Paying": "支払い",
    "OrderLine.Failure": "失敗",
    "OrderLine.Sample": "サンプル",
    "OrderLine.ErrorOrderRow": "注文したリストがシステム内で見つかりません！サポートにお問い合わせください！",

    "ConfirmationModal.Label.OrderDetails": "注文詳細",
    "ConfirmationModal.Label.Total": "合計",
    "ConfirmationModal.Label.Shipping": "発送",
    "ConfirmationModal.Label.TransactionFees": "取引手数料",
    "ConfirmationModal.Tooltip.TransactionFees":
      "取引手数料には、Spocketの決済プロバイダーであるStripeが請求する手数料やサービス手数料が含まれます。",
    "ConfirmationModal.Modal.OrderConfirmation": "注文の確認",
    "ConfirmationModal.Modal.Alert.Attention": "ご注意！",
    "ConfirmationModal.Modal.Alert.Description": "この注文には、お客様からのメモが含まれています。",
    "ConfirmationModal.Modal.YoureAboutToPlaceOrder": "注文しようとしています",
    "ConfirmationModal.Modal.Table.Th.Name": "名前",
    "ConfirmationModal.Modal.Table.Th.Price": "価格",
    "ConfirmationModal.Modal.Table.Th.Qty": "数量",
    "ConfirmationModal.Modal.Table.Th.Total": "合計",
    "ConfirmationModal.Modal.Label.Note": "サプライヤーへのメモ",
    "ConfirmationModal.Modal.PlaceHolder.Note": "あなたのメッセージ",
    "ConfirmationModal.Button.PlaceOrder": "注文する",

    "PaymentCompleteModal.PaymentCompleted": "支払いが完了しました",
    "PaymentCompleteModal.PaymentCompleted.Note":
      "お支払いありがとうございました。サプライヤーに通知されており、まもなく注文を処理します。注文のステータスを更新し、注文ページに追跡番号を追加します。",
    "PaymentCompleteModal.PaymentIncomplete": "ご注文は不完全です！",
    "PaymentCompleteModal.PaymentIncomplete.BankRequiresConfirmation.Note":
      "お手続きを進めるには、銀行でのお支払いの確認が必要です。",
    "PaymentCompleteModal.PaymentIncomplete.ConfirmationLink":
      "お支払いの確認はこちらのリンクからお願いします。",
    "PaymentCompleteModal.PaymentIncomplete.Note":
      "お支払いを確認されると、サプライヤーに通知され、注文は通常どおり処理されます。ステータスと追跡の更新が注文ページに追加されます。ご確認後、ページを再度読み込んでください。",

    "SetYourGoalsModal.Title": "ストアに追加された商品の数",
    "SetYourGoalsModal.Subtitle": "一般的の店舗では売り上げを計上する前に25個の商品をプッシュ",
    "SetYourGoalsModal.DropdownItem.Product": "{{count}} 商品",
    "SetYourGoalsModal.DropdownItem.Product_plural": "{{count}} 商品",
    "SetYourGoalsModal.Button": "目標を設定してドロップシッピングを開始する",

    "YourGoalsBanner.Container.Description": "あなたの目標",
    "YourGoalsBanner.Header.Title": "ビジネスを始める",
    "YourGoalsBanner.Header.Subtitle": "お店を準備しましょう",
    "YourGoalsBanner.Progress.Completed": "完成",
    "YourGoalsBanner.ProductPushedCount": "<0>目標：{{goalsNumberOfProduct}}</0>プッシュされた商品",
    "YourGoalsBanner.CheckPoints.JoinSpocket": "Spocketに参加する",
    "YourGoalsBanner.CheckPoints.FirstSearch": "最初の検索",
    "YourGoalsBanner.CheckPoints.ProductsPushed": "{{count}} / {{goalsNumberOfProduct}}プッシュされた商品",
    "YourGoalsBanner.CheckPoints.ProductsPushed_plural":
      "{{count}} / {{goalsNumberOfProduct}}プッシュされた商品",
    "YourGoalsBanner.CheckPoints.ProductsImported":
      "{{count}} / {{goalsNumberOfProduct}}インポートされた商品",
    "YourGoalsBanner.CheckPoints.ProductsImported_plural":
      "{{count}} / {{goalsNumberOfProduct}}インポートされた商品",

    "Plan.Starter": "スターター",
    "Plan.Professional": "プロフェッショナル",
    "Plan.Empire": "エンパイア",
    "Plan.Unicorn": "ユニコーン",

    "Aliscraper.Title": "自動化されたAliExpressのドロップシッピング",
    "Aliscraper.Subtitle":
      "何千ものAliExpress製品をワンクリックでeコマースストアにインポートし、ドロップシッピングビジネスを自動化します。",
    "Aliscraper.Features.Feature1": "ワンクリックで高速インポート",
    "Aliscraper.Features.Feature2": "Spocketで数百件の注文を即座に処理",
    "Aliscraper.Features.Feature3": "24時間年中無休のカスタマーサポート",
    "Aliscraper.Button": "拡張機能をダウンロードする",
    "Aliscraper.Chrome": "Chromeウェブストアで入手可能",

    "SpocketIphoneApp.Title": "Dropshipping iOS App", // English
    "SpocketIphoneApp.Subtitle":
      "Discover fast shipping dropshipping products from pre-vetted suppliers in the US, Europe, and globally. Add them to your store within minutes, and start selling.", // English
    "SpocketIphoneApp.Features.Feature1": "Manage your online store from anywhere at any time", // English
    "SpocketIphoneApp.Features.Feature2": "Exclusive discounts on products and iOS plans", // English
    "SpocketIphoneApp.Features.Feature3": "24/7 Premium customer support", // English

    "SpocketAndroidApp.Title": "Dropshipping Android App", // English
    "SpocketAndroidApp.Subtitle":
      "Discover fast shipping dropshipping products from pre-vetted suppliers in the US, Europe, and globally.", // English
    "SpocketAndroidApp.Features.Feature1": "Manage your online store from anywhere at any time", // English
    "SpocketAndroidApp.Features.Feature2": "Exclusive discounts on products", // English
    "SpocketAndroidApp.Features.Feature3": "24/7 Premium customer support", // English

    "SpocketAlibaba.Title": "Alibaba.com", // English
    "SpocketAlibaba.Subtitle":
      "Find trending products on Alibaba instantly and save time on your search for winning dropshipping products. Add products to your store within minutes, and start selling.", // English
    "SpocketAlibaba.Features.Feature1": "Save time finding winning products", // English
    "SpocketAlibaba.Features.Feature2": "Instant integration with your online store through Spocket", // English
    "SpocketAlibaba.Features.Feature3": "Access to thousands of unsaturated niches", // English
    "SpocketAlibaba.Button": "Download the Extention",

    "ConnectStoreModal.Header.Title": "あなたのショップをつなぎます",
    "ConnectStoreModal.Footer.Text": "開始するプラットフォームを選択してください",
    "ConnectStoreModal.ShopifyForm.UrlText": "ShopifyストアのURL",
    "ConnectStoreModal.ShopifyForm.InvalidName": "ストア名が無効です",
    "ConnectStoreModal.ShopifyForm.Placeholder": "例：マイストア",
    "ConnectStoreModal.ShopifyForm.FooterText": "お店をお持ちではませんか？",
    "ConnectStoreModal.ShopifyForm.FooterLink": "無料でお試しください",
    "ConnectStoreModal.ShopifyForm.Button": "ストアをつなげる",
    "ConnectStoreModal.WoocommerceInstruction.StoreIdText": "あなたの認証キー：",
    "ConnectStoreModal.WoocommerceInstruction.Intro": "ストアをSpocketに接続する方法：",
    "ConnectStoreModal.WoocommerceInstruction.Step1": "Spocketプラグインのインストールは",
    "ConnectStoreModal.WoocommerceInstruction.Step1Link": "ここから",
    "ConnectStoreModal.WoocommerceInstruction.Step2": "プラグインのページでプラグインをアクティブ化します",
    "ConnectStoreModal.WoocommerceInstruction.Step3": "WordPressダッシュボードから > Spocketに移動します",
    "ConnectStoreModal.WoocommerceInstruction.Step4": "認証キー（上記）を貼り付けて「保存」をクリックします",
    "ConnectStoreModal.WoocommerceInstruction.Trouble": "お困りですか？",
    "ConnectStoreModal.WoocommerceInstruction.TroubleLink": "お問い合わせはこちら",
    "ConnectStoreModal.WoocommerceInstruction.Button": "完了する",
    "ConnectStoreModal.WixForm.FooterText": "お店をお持ちではませんか？",
    "ConnectStoreModal.WixForm.FooterLink": "無料でお試しください",
    "ConnectStoreModal.WixForm.Button": "ストアをつなげる",
    "ConnectStoreModal.FelexForm.FooterText": "お店をお持ちではませんか？",
    "ConnectStoreModal.FelexForm.FooterLink": "無料でお試しください",
    "ConnectStoreModal.FelexForm.Button": "ストアをつなげる",
    "ConnectStoreModal.BigcommerceForm.UrlText": "ビッグコマースストアのURL",
    "ConnectStoreModal.BigcommerceForm.InvalidName": "ストア名が無効です",
    "ConnectStoreModal.BigcommerceForm.Placeholder": "例：マイストア",
    "ConnectStoreModal.BigcommerceForm.FooterText": "お店をお持ちではませんか？",
    "ConnectStoreModal.BigcommerceForm.FooterLink": "無料でお試しください",
    "ConnectStoreModal.BigcommerceForm.Button": "ストアをつなげる",
    "ConnectStoreModal.EcwidForm.FooterText": "お店をお持ちではませんか？",
    "ConnectStoreModal.EcwidForm.FooterLink": "無料でお試しください",
    "ConnectStoreModal.EcwidForm.Button": "ストアをつなげる",
    "ConnectStoreModal.SquarespaceForm.FooterText": "お店をお持ちではませんか？",
    "ConnectStoreModal.SquarespaceForm.FooterLink": "無料でお試しください",
    "ConnectStoreModal.SquarespaceForm.Button": "ストアをつなげる",
    "ConnectStoreModal.SquareForm.FooterText": "お店をお持ちではませんか？",
    "ConnectStoreModal.SquareForm.FooterLink": "無料でお試しください",
    "ConnectStoreModal.SquareForm.Button": "ストアをつなげる",
    "ConnectStoreModal.FelexButton.Explanation":
      "起業家向けウェブストア作成プラットフォームでドロップシッピングストアを10分以内に開設。",

    "PaymentTab.Document.Title": "設定 - 自動化 - Spocket",
    "PaymentTab.Title.Billing": "請求",
    "PaymentTab.Tooltip.Billing": "クレジットカードは、注文処理とサブスクリプションの支払いに使用されます",
    "PaymentTab.AccordionItem.PauseChangeYourPlan": "一時停止/プランの変更",
    "PaymentTab.AccordionItem.Label.ChangeYourPlan": "プランの変更",
    "PaymentTab.AccordionItem.Button.Downgrade": "ダウングレードする",
    "PaymentTab.AccordionItem.Label.PauseYourPlan": "プランの一時停止",
    "PaymentTab.AccordionItem.Label.StoreHasBeenPaused": "あなたのストアはすでに一時停止されています",
    "PaymentTab.AccordionItem.Button.PauseYourPlan": "プランの一時停止",
    "PaymentTab.AccordionItem.Tooltip.PauseStore":
      "Spocketアカウントを一時的に停止して、データを失うことなくいつでも戻ってくることができます。",
    "PaymentTab.AccordionItem.Label.RemindMeLater": "後でリマインドする",
    "PaymentTab.AccordionItem.Button.RemindMeLater": "後でリマインドする",
    "PaymentTab.AccordionItem.Tooltip.RemindMeLater.3DaysBefore": "３日前",
    "PaymentTab.AccordionItem.Tooltip.RemindMeLater":
      "特典を維持して <1>{{daysBefore}}</1>にメンバーシップが更新されることをリマインドしてください",
    "RemindMeLaterModal.Header.ReminderSet": "リマインダー設定",
    "RemindMeLaterModal.Body.DaysBefore": "３日前にメールを送信",
    "RemindMeLaterModal.Body.ReminderSet":
      "リマインダーが設定され、<1>{{daysBefore}}</1>にあなたの特典が更新されるまで、起業家としての旅を続けてください。",
    "RemindMeLaterModal.Button.Continue": "続ける",
    "PauseStoreModal.Title.PauseYourStore": "ストアの一時休止",
    "PauseStoreModal.Description.PauseYourStore":
      "この1度限りのオファーを利用すると、今後30日間、プラン料金を70％割引します。",
    "PauseStoreModal.Button.PauseStore": "ストアを一時休止する",
    "PauseStoreModal.Description.StorePaused":
      "ストアは一時休止されており、翌月のご利用分が70％引きになります。その後、通常のお支払いが再開されますのでご注意ください。",
    "ConfirmPasswordModal.Title": "パスワードをご確認ください",
    "ConfirmPasswordModal.SubTitle": "セキュリティ上の理由から、パスワードを確認してください",
    "ConfirmPasswordModal.Input.Placeholder": "あなたのパスワード",
    "ConfirmPasswordModal.Button.Cancel": "キャンセルする",
    "ConfirmPasswordModal.Button.Confirm": "確認する",

    "NewPasswordForm.Title": "Please set a password before logging out!", // English
    "NewPasswordForm.PasswordInput.Placeholder": "New Password", // English
    "NewPasswordForm.ConfirmPasswordInput.Placeholder": "Confirm New Password", // English

    "Config.MomentJs.Locale": "ja",
    "Config.Plan.Starter": "スターター",
    "Config.Plan.Professional": "プロ",
    "Config.Plan.Empire": "エンパイア",
    "Config.Plan.Unicorn": "ユニコーン",

    "UpgradeConfirmationModal.Header.Title": "Spocketでより速く成長 ",
    "UpgradeConfirmationModal.Body.Title": "請求サイクルの選択",
    "UpgradeConfirmationModal.BulletPoints.Trial.Initial": "最初の",
    "UpgradeConfirmationModal.BulletPoints.Trial.BeforeNumber": "",
    "UpgradeConfirmationModal.BulletPoints.Trial.AfterNumber": "数日間 ",
    "UpgradeConfirmationModal.BulletPoints.Trial.Final":
      "は無料です。トライアル中またはトライアル後にキャンセルしてください",
    "UpgradeConfirmationModal.BulletPoints.FirstBill": "最初の請求は、次のように予定されています",
    "UpgradeConfirmationModal.BulletPoints.FirstBillNoTrial": "最初の請求は確認時に行われます",
    "UpgradeConfirmationModal.BulletPoints.Recurrence": "毎月請求されます",
    "UpgradeConfirmationModal.MonthlyTab.RateType": "毎月 ",
    "UpgradeConfirmationModal.MonthlyTab.RateFrequency": "/月",
    "UpgradeConfirmationModal.YearlyTab.RateType": "毎年 ",
    "UpgradeConfirmationModal.YearlyTab.RateFrequency": "/月",
    "UpgradeConfirmationModal.YearlyTab.Discount": "OFF",
    "UpgradeConfirmationModal.TaxRates.Text": "消費税",
    "UpgradeConfirmationModal.TaxRates.Period": "月",
    "UpgradeConfirmationModal.YearlyPanel.PayNow": "今すぐ支払う",
    "UpgradeConfirmationModal.YearlyPanel.PerMonth": "/月 X 12ヶ月",
    "UpgradeConfirmationModal.YearlyPanel.Savings": "お得になった金額：",
    "UpgradeConfirmationModal.YearlyPanel.Period": "/年",
    "UpgradeConfirmationModal.YearlyPanel.EquivalentInitial": "に相当",
    "UpgradeConfirmationModal.YearlyPanel.EquivalentFinal": "% 引き",
    "UpgradeConfirmationModal.YearlyPanel.Warning.Trial": "年間プランにはトライアル期間はありません",
    "UpgradeConfirmationModal.YearlyPanel.Warning.Charge": "すぐに全額請求されます",
    "UpgradeConfirmationModal.CreditCardTab.Info": "クレジット/デビットカードで支払う",
    "UpgradeConfirmationModal.PayPalTab.Info": "PayPalで支払う",
    "UpgradeConfirmationModal.PaymentSection.Details": "支払の詳細 ",
    "UpgradeConfirmationModal.CheckoutButton.FreeTrial": "無料トライアルを請求する",
    "UpgradeConfirmationModal.CheckoutButton.Upgrade": "アップグレードする ",
    "UpgradeConfirmationModal.FooterTestA.Info1.Top": "50,000人以上の起業家からの信頼",
    "UpgradeConfirmationModal.FooterTestA.Info1.Bottom":
      "お客様から一貫して５段階評価で５をいただいています。",
    "UpgradeConfirmationModal.FooterTestA.Info2.Top": "128ビットSSL暗号化",
    "UpgradeConfirmationModal.FooterTestA.Info2.Bottom": "すべての支払い情報は100％安全です。",
    "UpgradeConfirmationModal.FooterTestB.Avatars": "50,000人以上",
    "UpgradeConfirmationModal.FooterTestB.Info1.Top": "50,000人以上の起業家からの信頼",
    "UpgradeConfirmationModal.FooterTestB.Info1.Bottom":
      "お客様から一貫して５段階評価で５をいただいています。",
    "UpgradeConfirmationModal.FooterTestB.Info2.Top": "128ビットSSL暗号化",
    "UpgradeConfirmationModal.FooterTestB.Info2.Bottom": "すべての支払い情報は100％安全です。",
    "UpgradeConfirmationModal.Agreement.Intro": "続行すると、あなたは以下の内容に同意したことになります ",
    "UpgradeConfirmationModal.Agreement.Terms": "利用規約",
    "UpgradeConfirmationModal.Agreement.Privacy": "個人情報保護方針",
    "UpgradeConfirmationModal.Agreement.Refund": "返金ポリシー",
    "UpgradeConfirmationModal.Agreement.Middle": "、および",
    "UpgradeConfirmationModal.Agreement.Cancelation": "キャンセルポリシー",

    "OrderDetails.Title": "注文詳細",

    "CreditCard.Update.Label": "クレジットカード",
    "CreditCard.Update.InputValue": "で終わるクレジットカード",
    "CreditCard.Update.Button": "カードを更新する",
    "CreditCard.AddCreditCard.Text":
      "まだクレジットカードを追加していません。下のボタンからクレジットカードを追加して、注文を自動的に処理できるようにしてください",
    "CreditCard.AddCreditCardSubscription.Text": "You have not added any credit card yet. Please add a credit card below to allow us to process your membership automatically", // ENGLISH
    "CreditCard.AddCreditCard.Button": "クレジットカード追加する",

    "Sidebar.SearchProducts": "商品を検索する",
    "Sidebar.WinningProducts": "売れ筋商品",
    "Sidebar.WinningProducts.Variant": "NEW",
    "Sidebar.ImportList": "インポートリスト",
    "Sidebar.MyProducts": "マイプロダクト",
    "Sidebar.MyOrders": "マイオーダー",
    "Sidebar.Apps": "アプリ",
    "Sidebar.HelpCenter": "ヘルプセンター",
    "Sidebar.MyShop": "マイショップ",
    "Sidebar.Settings": "設定",

    "TutorialModal.Title": "私たちがお答えいたします",
    "TutorialModal.WhatIsSpocket": "Spocketとは?",
    "TutorialModal.DiscoverProducts": "製品の紹介",
    "TutorialModal.ProductCustomization": "製品のカスタマイズ",
    "TutorialModal.OrderProcessing": "オーダー処理",
    "TutorialModal.Settings": "設定",
    "TutorialModal.GetHelp": "お問い合わせ",
    "TutorialModal.JoinTheCommunity": "コミュニティに参加する",

    "NotificationCenter.Header": "通知センター",
    "NotificationCenter.Footer": "すべての通知を見る",
    "NotificationCenter.NoNotification": "ここには何もありません！",

    "Products.Title.Head": "マイプロダクト - Spocket",
    "Products.Title.Header": "マイプロダクト",
    "Products.Loading.Top": "商品リストが読み込まれています！",
    "Products.Loading.Bottom": "商品情報を読み出すまでお待ちください。",
    "Products.Empty.Search": "商品が見つかりませんでした！",
    "Products.Empty.Top": "あなたの商品リストは空です！",
    "Products.Empty.Bottom": "検索ページに移動して、インポートリストへの商品の追加を開始します。",
    "Products.Empty.Button.Search": "商品を検索する",
    "Products.Empty.Button.How": "製品の探し方",
    "Products.Alert.Removed": "製品が削除されました",

    "Products.Search.Label": "製品を検索する",
    "Products.Search.Placeholder": "キーワード",
    "Products.Search.Button": "検索する",

    "ProductListItem.Inactive.Tooltip": "この製品は、サプライヤーから入手できなくなりました",
    "ProductListItem.Inactive.Title": "非アクティブ",
    "ProductListItem.OutOfStock.Tooltip": "この商品のバリエーションはすべて在庫切れです",
    "ProductListItem.OutOfStock.Title": "在庫切れ",
    "ProductListItem.InventoryCount.Singular": "個",
    "ProductListItem.InventoryCount.Plural": "個",
    "ProductListItem.InventoryCount.End.Singular": "残り",
    "ProductListItem.InventoryCount.End.Plural": "残り",
    "ProductListItem.Button.View": "ストアで見る",
    "ProductListItem.Button.Remove": "ストアから削除する",
    "ProductListItem.ItemVariant.LowStock.Label": "Low Stock", // ENGLISH

    "ImportList.Title.Head": "インポートリスト - Spocket",
    "ImportList.Title.Header": "マイインポートリスト",
    "ImportList.Loading.Top": "インポートリストが読み込まれています！",
    "ImportList.Loading.Bottom": "商品情報を読み出すまでお待ちください。",
    "ImportList.Empty.Button.Search": "商品を検索する",
    "ImportList.Empty.Top": "インポートリストが空です!",
    "ImportList.Empty.Bottom": "検索ページに移動して、インポートリストへの商品の追加を開始します。",
    "ImportList.Empty.Button.How": "製品をカスタマイズする方法",
    "ImportList.Alert.Pushed": "この商品はあなたのストアにプッシュされました：",
    "ImportList.LowStockVariants.Label": "Low stock variants", // ENGLISH

    "ImportList.Search.Label": "インポートされた製品を検索する",
    "ImportList.Search.Placeholder": "製品を検索する",
    "ImportList.Search.Button": "検索する",

    "PushAllModal.Button.Active": "現在のページの製品をプッシュする",
    "PushAllModal.Button.Inactive": "現在のページをプッシュする",
    "PushAllModal.Modal.Text":
      "この現在のページからすべての製品をプッシュしてもよろしいですか？現在のページにある有効な商品はすべてあなたのストアにプッシュされます。",
    "PushAllModal.Modal.Push": "すべてプッシュ",
    "PushAllModal.Modal.Cancel": "キャンセルする",

    "RemoveAllModal.Button.Active": "現在のページの製品を削除する",
    "RemoveAllModal.Button.Inactive": "現在のページを削除する",
    "RemoveAllModal.Modal.Text":
      "この現在のページからすべての製品を削除してもよろしいですか？現在のページにある製品はすべてインポートリストから削除されます。",
    "RemoveAllModal.Modal.Remove": "すべて削除",
    "RemoveAllModal.Modal.Cancel": "キャンセルする",

    "ImportListItem.Tab.Product": "商品",
    "ImportListItem.Tab.Description": "説明",
    "ImportListItem.Tab.Variants": "バリアント",
    "ImportListItem.Tab.Images": "画像",
    "ImportListItem.Remove.Active": "製品の削除",
    "ImportListItem.Remove.Inactive": "製品を削除する",
    "ImportListItem.Push.Active": "ストアへのプッシュ",
    "ImportListItem.Push.Inactive": "ストアにプッシュする",
    "ImportListItem.Save.Button": "保存する",
    "ImportListItem.Alert.Removed": "この製品はインポートリストから削除されました：",
    "ImportListItem.Alert.RemoveFailed": "削除しようとして問題が発生しました：",
    "ImportListItem.Alert.CompareAtPrice": "価格で比較すると、販売価格よりも高くなりますす：",
    "ImportListItem.Alert.OneActiveVariation":
      "この製品には、少なくとも1つのアクティブなバリアントが必要です：",
    "ImportListItem.Alert.Saved": "この製品は保存されました：",
    "ImportListItem.Alert.ErrorPushing": "ストアにプッシュする時に何か問題が発生しました",
    "ImportListItem.Alert.ErrorSaving": "ストアを保存する時に問題が発生しました",
    "ImportListItem.Modal.ConnectStore": "ストアをつないで商品をプッシュしましょう：",
    "ImportListItem.Tooltip.OneActiveVariation": "少なくとも1つのアクティブなバリエーションが必要です",
    "ImportListItem.Tooltip.Unavailable": "この製品は現在購入できません",
    "ImportListItem.Tooltip.Unsaved": "保存されていない変更があります",
    "ImportListItem.Tooltip.Profit": "警告：この製品の粗利はマイナスです",
    "ImportListItem.Tooltip.Unpurchasable": "この製品を保存することはできますが、現在購入できません",
    "ImportListItem.Variants.ShowShippingPrices": "配送料の表示",

    "ItemInfo.ProductName.Label": "商品名",
    "ItemInfo.ProductTags.Label": "商品タグ",
    "ItemInfo.ProductTags.Remove": "すべてのタグを削除",
    "ItemInfo.ProductTags.Placeholder": "新しいタグを追加",
    "ItemInfo.ProductType.Label": "商品タイプ",
    "ItemInfo.Collection.Label": "コレクション",
    "ItemInfo.Collection.Placeholder": "選択",
    "ItemInfo.Collection.Option": "選択",

    "ItemVariantList.Modal.Title": "配送の詳細",
    "ItemVariantList.Modal.Intro": "発送元：",
    "ItemVariantList.Modal.DoesNotShipInternational": "この商品は海外発送ができません。",
    "ItemVariantList.Modal.DoesNotShipTo": "発送できない国：",
    "ItemVariantList.Table.Head.Destination": "送り先",
    "ItemVariantList.Table.Head.Cost": "費用",
    "ItemVariantList.Table.Head.Time": "配達時間（日数）",
    "ItemVariantList.Table.Body.Domestic": "国内",
    "ItemVariantList.Table.Body.International": "海外",
    "ItemVariantList.VariantsTable.ShippingPrice": "配送料 ",
    "ItemVariantList.VariantsTable.Image": "画像",
    "ItemVariantList.VariantsTable.SKU": "SKU",
    "ItemVariantList.VariantsTable.Inventory": "在庫",
    "ItemVariantList.VariantsTable.Price": "価格",
    "ItemVariantList.VariantsTable.SalesPrice": "販売価格 ",
    "ItemVariantList.VariantsTable.Profit": "利益",
    "ItemVariantList.VariantsTable.CompareAtPrice": "価格で比較",
    "ItemVariantList.VariantsTable.Unavailable": "この製品は現在購入できません",
    "ItemVariantList.VariantsTable.Head": "この製品のすべてのバリアントがここに表示されます。",
    "ItemVariantList.VariantsTable.ContextPopover.Placeholder": "例：40%",
    "ItemVariantList.Alert.MaxVariants": "Shopifyは100以上のバリエーションはサポートしていません。",

    "ItemVariantList.ContextPopover.Title": "利益の設定",
    "ItemVariantList.ContextPopover.Apply": "適用",

    "ProductVariation.Description":
      "サンプル製品はSpocketで直接注文できます。以下の手順で簡単にチェックアウトできます。",
    "ProductVariation.Label.SelectVariant": "バリアントを選択",
    "ProductVariation.Label.SelectTheProductVariation": "製品バリエーションを選択",
    "ProductVariation.Qty": "数量",
    "ProductVariation.Label.NotesForTheSupplier": "サプライヤーへの注意事項",

    "InputAddress.Label.FirstName": "名",
    "InputAddress.PlaceHolder.FirstName": "名を入力してください",
    "InputAddress.Label.LastName": "姓",
    "InputAddress.PlaceHolder.LastName": "姓を入力してください",
    "InputAddress.Label.StreetAddress": "住所",
    "InputAddress.Label.Country": "国",
    "InputAddress.PlaceHolder.Country": "国を検索",
    "InputAddress.Label.State": "県",
    "InputAddress.Placeholder.State": "県を検索",
    "InputAddress.Label.City": "市",
    "InputAddress.PlaceHolder.City": "都市名を入力",
    "InputAddress.Label.Zip": "郵便番号",
    "InputAddress.PlaceHolder.Zip": "郵便番号を入力",
    "InputAddress.Label.Phone": "電話番号",
    "InputAddress.Placeholder.Phone": "電話番号を入力",

    "OrderReview.OrderDetails": "オーダー詳細",
    "OrderReview.Unit": "{{count}} 単位",
    "OrderReview.Unit_plural": "{{count}} 単位",
    "OrderReview.ShippingAddress": "配送先住所",
    "OrderReview.PaymentMethod": "支払い方法",
    "OrderReview.Amounts": "金額",
    "OrderReview.Subtotal": "小計",
    "OrderReview.ShippingCost": "配送料",
    "OrderReview.TransactionFees": "取引手数料",
    "OrderReview.TransactionFees.ToolTips":
      "取引手数料には、Spocketの決済プロバイダーであるStripeが請求する手数料やサービス手数料が含まれます。",
    "OrderReview.OrderTotal": "オーダー合計",
    "OrderReview.ItemWithCount": "{{count}} アイテム",
    "OrderReview.ItemWithCount_plural": "{{count}} アイテム",
    "OrderReview.Placeholder.CreditCard": "{{last4}}で終わるクレジットカード",

    "PaymentComplete.PaymentCompleted": "支払いが完了しました",
    "PaymentComplete.PaymentCompleted.Note":
      "お支払いありがとうございました。サプライヤーに通知されており、まもなく注文を処理します。注文のステータスを更新し、注文ページに追跡番号を追加します。",
    "PaymentComplete.PaymentIncomplete": "ご注文は不完全です！",
    "PaymentComplete.PaymentIncomplete.BankRequiresConfirmation.Note":
      "お手続きを進めるには、銀行でのお支払いの確認が必要です。",
    "PaymentComplete.PaymentIncomplete.ConfirmationLink": "お支払いの確認はこちらのリンクからお願いします。",
    "PaymentComplete.PaymentIncomplete.Note":
      "お支払いを確認されると、サプライヤーに通知され、注文は通常どおり処理されます。ステータスと追跡の更新が注文ページに追加されます。ご確認後、ページを再度読み込んでください。",

    "CreditCard.AddCreditCard.Description":
      "まだクレジットカードを追加していません。下のボタンからクレジットカードを追加して、注文を自動的に処理できるようにしてください",
    "CreditCard.Button.AddCreditCard": "クレジットカード追加する",
    "CreditCard.Button.UpdateCard": "カードを更新する",
    "CreditCard.UpdateCard.Label.CreditCard": "クレジットカード",
    "CreditCard.PlaceHolder.CreditCard": "{{last4}}で終わるクレジットカード",

    "UpdateCreditCardModal.Label.CreditCard": "クレジットカード",
    "UpdateCreditCardModal.Button.UpdateCard": "カードを更新する",
    "UpdateCreditCardModal.Button.AddCreditCard": "クレジットカード追加する",
    "UpdateCreditCardModal.Button.Cancel": "キャンセルする",
    "UpdateCreditCardModal.Label.UpdateCardDetails": "カードの詳細を更新する",
    "UpdateCreditCardModal.Label.TermsAndConditionsNote.One":
      "あなたのアカウントは、Spocket製品のオーダー処理中に使用されます。",
    "UpdateCreditCardModal.Label.TermsAndConditionsNote.Two": "ご利用規約",
    "UpdateCreditCardModal.Label.TermsAndConditionsNote.Three": "支払い処理用",

    "SampleOrderModal.Title.SelectVariation": "バリエーションを選択",
    "SampleOrderModal.Title.ShippingAddress": "配送先住所",
    "SampleOrderModal.Title.PaymentMethod": "支払い方法",
    "SampleOrderModal.Title.Review": "レビュー",
    "SampleOrderModal.Title.PaymentConfirmationRequired": "支払い確認が必要です！",
    "SampleOrderModal.Title.OrderPlaced": "オーダー済み！",
    "SampleOrderModal.Steps": "ステップ  {{total}} の{{current}}",
    "SampleOrderModal.FinalStep": "最終ステップ",
    "SampleOrderModal.ConfirmPayment": "お支払いをご確認ください！",
    "SampleOrderModal.Finished": "完了",
    "SampleOrderModal.Footer.Continue": "続ける",
    "SampleOrderModal.Footer.PlaceOrder": "注文する",
    "SampleOrderModal.Footer.Close": "閉じる",
    "SampleOrderModal.Footer.Cancel": "キャンセルする",
    "SampleOrderModal.Footer.GoBack": "戻る",

    "RatingCaptureModal.EnjoyingSpocket": "Spocketを楽しんでますか？",
    "RatingCaptureModal.TapAStar": "星をタップしてAppStoreで評価してください",

    "AdvancedFiltersModal.Title.Filters": "フィルター",
    "AdvancedFiltersModal.Title.Shipping": "発送",
    "AdvancedFiltersModal.Label.ShipsFrom": "発送元",
    "AdvancedFiltersModal.Label.ShipsTo": "配送先",
    "AdvancedFiltersModal.Label.ShippingTime": "配送時間",
    "AdvancedFiltersModal.Label.Popular": "ポピュラー",
    "AdvancedFiltersModal.Label.Country.UnitedStates": "アメリカ",
    "AdvancedFiltersModal.Label.Country.Europe": "ヨーロッパ",
    "AdvancedFiltersModal.Label.ShippingTimeDescription": "米国への発送のみ可能",
    "AdvancedFiltersModal.RadioOption.ShippingTime.Any": "すべての配達日数",
    "AdvancedFiltersModal.RadioOption.ShippingTime.One": "1〜3日",
    "AdvancedFiltersModal.RadioOption.ShippingTime.Four": "4〜7日",
    "AdvancedFiltersModal.RadioOption.ShippingTime.Eight": "8〜14日",
    "AdvancedFiltersModal.RadioOption.ShippingTime.Fifteen": "15日以上",
    "AdvancedFiltersModal.Title.ItemsCost": "アイテムの費用",
    "AdvancedFiltersModal.Label.ItemCost": "アイテムの費用",
    "AdvancedFiltersModal.Label.ShippingCost": "配送料",
    "AdvancedFiltersModal.RadioOption.ShippingCost.Any": "すべての配送費用",
    "AdvancedFiltersModal.RadioOption.ShippingCost.Free": "無料",
    "AdvancedFiltersModal.RadioOption.ShippingCost.Five": "5ドル以下",
    "AdvancedFiltersModal.RadioOption.ShippingCost.Fifteen": "15ドル以下",
    "AdvancedFiltersModal.RadioOption.ShippingCost.TwentyFive": "25ドル以下",
    "AdvancedFiltersModal.Title.Supplier": "サプライヤー",
    "AdvancedFiltersModal.Select.MenuTitle.Suppliers": "サプライヤー",
    "AdvancedFiltersModal.Label.TopSupplier": "トップサプライヤー",
    "AdvancedFiltersModal.Label.TopSupplierDescription":
      "質の高い製品、優れたサービス、高い評価で知られるサプライヤー",
    "AdvancedFiltersModal.Title.Advanced": "アドバンス",
    "AdvancedFiltersModal.Checkbox.Label.PremiumProducts": "プレミアム商品",
    "AdvancedFiltersModal.Checkbox.Label.PremiumProductsDescription": "割引率が高く、出荷が早い商品",
    "AdvancedFiltersModal.Checkbox.Label.BestSeller": "ベストセラー",
    "AdvancedFiltersModal.Checkbox.Label.BestSellerDescription":
      "Spocketで最高のパフォーマンスを発揮する製品",
    "AdvancedFiltersModal.Button.Cancel": "キャンセルする",
    "AdvancedFiltersModal.Button.ViewResults": "結果を見る",
    "AdvancedFiltersModal.Select.PlaceHolder.Countries": "国を検索...",
    "AdvancedFiltersModal.Select.MenuTitle.Countries": "国",
    "AdvancedFiltersModal.Select.PlaceHolder.Suppliers": "サプライヤーの検索...",
    "AdvancedFiltersModal.Label.All Suppliers": "すべてのサプライヤー",
    "AdvancedFiltersModal.Label.New Suppliers": "新規サプライヤー",

    "AdvancedFilters.ShippingTime.Any": "すべての配達日数",
    "AdvancedFilters.ShippingTime.One": "1〜3日",
    "AdvancedFilters.ShippingTime.Four": "4〜7日",
    "AdvancedFilters.ShippingTime.Eight": "8〜14日",
    "AdvancedFilters.ShippingTime.Fifteen": "15日以上",

    "AdvancedFilters.ShippingCost.Free": "送料無料",
    "AdvancedFilters.ShippingCost.Five": "5ドル以下の送料",
    "AdvancedFilters.ShippingCost.Fifteen": "15ドル以下の送料",
    "AdvancedFilters.ShippingCost.TwentyFive": "25ドル以下の送料",

    "AdvancedFilters.transpileFiltersKey.Label.ClearAll": "すべてクリア",
    "AdvancedFilters.transpileFiltersKey.Label.Shipping": "発送",
    "AdvancedFilters.transpileFiltersKey.Label.Keywords": "検索する",
    "AdvancedFilters.transpileFiltersKey.Label.ShipsFrom": "発送元",
    "AdvancedFilters.transpileFiltersKey.Label.ShipsTo": "配送先",
    "AdvancedFilters.transpileFiltersKey.Label.Supplier": "サプライヤー",
    "AdvancedFilters.transpileFiltersKey.Label.SortBy": "並び替え",
    "AdvancedFilters.transpileFiltersKey.Label.ItemCost": "アイテム費用",
    "AdvancedFilters.transpileFiltersKey.Value.TopSuppliers": "トップサプライヤー",
    "AdvancedFilters.transpileFiltersKey.Value.PersonalizedInvoices": "パーソナライズされた請求書",
    "AdvancedFilters.transpileFiltersKey.Value.BestSeller": "ベストセラー",
    "AdvancedFilters.transpileFiltersKey.Value.Premium": "プレミアム",
    "AdvancedFilters.transpileFiltersKey.Value.ItemCost.FromTo": "{{from}} から {{to}} まで",
    "AdvancedFilters.transpileFiltersKey.Label.Inventory": "Inventory", // * ENGLISH

    "Search.Header.PlaceHolder.Search": "キーワードを入力...",
    "Search.Header.Button.Search": "検索する",
    "Search.Header.Button.Filters": "フィルター",

    "Navigation.UpgradeButton.TryPro": "Spocket Proを無料で試す",
    "Navigation.UpgradeButton.TryEmpire": "Spocket EMPIREを無料で試す",
    "Navigation.UpgradeButton.TryUnicorn": "Spocket Unicornを無料で試す",

    "CategoriesCards.Label.MoreCategories": "その他のカテゴリー",

    "StaticCategories.WomensClothing": "婦人服",
    "StaticCategories.WomensClothing.Activewear": "アクティブウェア",
    "StaticCategories.WomensClothing.Bodysuits": "ボディスーツ",
    "StaticCategories.WomensClothing.Dresses": "ドレス",
    "StaticCategories.WomensClothing.JacketsCoats": "ジャケット＆コート",
    "StaticCategories.WomensClothing.Jeans": "ジーンズ",
    "StaticCategories.WomensClothing.JumpsuitsRompers": "ジャンプスーツ＆ロンパース",
    "StaticCategories.WomensClothing.Leggings": "レギンス",
    "StaticCategories.WomensClothing.LingerieUnderwear": "ランジェリー＆下着",
    "StaticCategories.WomensClothing.MatchingSets": "マッチングセット",
    "StaticCategories.WomensClothing.Pants": "パンツ",
    "StaticCategories.WomensClothing.Shorts": "ショーツ",
    "StaticCategories.WomensClothing.Skirts": "スカート",
    "StaticCategories.WomensClothing.Sleepwear": "スリープウェア",
    "StaticCategories.WomensClothing.Socks": "ソックス",
    "StaticCategories.WomensClothing.SweatersHoodies": "セーター＆パーカー",
    "StaticCategories.WomensClothing.Swimwear": "スイムウェア",
    "StaticCategories.WomensClothing.TankTops": "タンクトップ",
    "StaticCategories.WomensClothing.TopsBlouses": "トップス＆ブラウス",
    "StaticCategories.WomensClothing.Tshirts": "Tシャツ",

    "StaticCategories.JewelryWatches": "ジュエリー＆時計",
    "StaticCategories.JewelryWatches.Bracelets": "ブレスレット",
    "StaticCategories.JewelryWatches.Earrings": "イヤリング",
    "StaticCategories.JewelryWatches.Necklaces": "ネックレス",
    "StaticCategories.JewelryWatches.OtherAccessories": "その他のアクセサリ",
    "StaticCategories.JewelryWatches.PendantsStonesCharms": "ペンダント、宝石、チャーム",
    "StaticCategories.JewelryWatches.Rings": "リング",
    "StaticCategories.JewelryWatches.Sets": "セット",
    "StaticCategories.JewelryWatches.Watches": "時計",

    "StaticCategories.TechAccessories": "家電アクセサリ",
    "StaticCategories.TechAccessories.AudioVideo": "オーディオ＆ビデオ",
    "StaticCategories.TechAccessories.CasesCovers": "ケース＆カバー",
    "StaticCategories.TechAccessories.Lighting": "照明",
    "StaticCategories.TechAccessories.MobileLaptopAccessories": "モバイル＆ラップトップアクセサリ",
    "StaticCategories.TechAccessories.Mousepads": "マウスパッド",
    "StaticCategories.TechAccessories.Novelty": "ノベルティ",

    "StaticCategories.KidsBabies": "キッズ＆ベビー",
    "StaticCategories.KidsBabies.BabyClothing": "ベビー服",
    "StaticCategories.KidsBabies.Bathing": "バス用品",
    "StaticCategories.KidsBabies.BlanketsPillows": "毛布＆枕",
    "StaticCategories.KidsBabies.CapsHeadbands": "帽子＆ヘッドバンド",
    "StaticCategories.KidsBabies.Footwear": "フットウェア",
    "StaticCategories.KidsBabies.Furniture": "家具",
    "StaticCategories.KidsBabies.KidsClothing": "子供服",
    "StaticCategories.KidsBabies.ParenthoodAccessories": "子育て＆アクセサリー",

    "StaticCategories.Toys": "おもちゃ",
    "StaticCategories.Footwear": "フットウェア",
    "StaticCategories.Footwear.Boots": "ブーツ",
    "StaticCategories.Footwear.Flats": "フラットシューズ",
    "StaticCategories.Footwear.Heels": "ハイヒール",
    "StaticCategories.Footwear.Mens": "メンズ",
    "StaticCategories.Footwear.Sandals": "サンダル",
    "StaticCategories.Footwear.Slippers": "スリッパ",
    "StaticCategories.Footwear.SneakersRunners": "スニーカー＆ランニング",

    "StaticCategories.BathBeauty": "バス＆ビューティー",
    "StaticCategories.BathBeauty.Bodycare": "ボディケア",
    "StaticCategories.BathBeauty.DiffusersOilsCandles": "ディフューザー、オイル、キャンドル",
    "StaticCategories.BathBeauty.Haircare": "ヘアケア",
    "StaticCategories.BathBeauty.Healthcare": "ヘルスケア",
    "StaticCategories.BathBeauty.Makeup": "メイクアップ",
    "StaticCategories.BathBeauty.Nails": "ネイル",
    "StaticCategories.BathBeauty.Skincare": "スキンケア",
    "StaticCategories.BathBeauty.TowelsRobes": "タオル＆ローブ",

    "StaticCategories.Pets": "ペット用品",
    "StaticCategories.Pets.BedsBlankets": "ベッド＆毛布",
    "StaticCategories.Pets.LeashesCollarsPetwear": "リード、首輪、ペットウェア",
    "StaticCategories.Pets.Petcare": "ペットケア",
    "StaticCategories.Pets.Toys": "おもちゃ",

    "StaticCategories.HomeGarden": "ホーム＆ガーデン",
    "StaticCategories.HomeGarden.Bathroom": "バスルーム",
    "StaticCategories.HomeGarden.Clocks": "置き時計",
    "StaticCategories.HomeGarden.Drinkware": "ドリンクウェア",
    "StaticCategories.HomeGarden.FoodBeverage": "食品＆飲料",
    "StaticCategories.HomeGarden.Furniture": "家具",
    "StaticCategories.HomeGarden.Garden": "ガーデン",
    "StaticCategories.HomeGarden.HomeDecor": "ホームデコ",
    "StaticCategories.HomeGarden.HomeImprovement": "ホームインプルーブメント",
    "StaticCategories.HomeGarden.Kitchen": "キッチン",
    "StaticCategories.HomeGarden.Lighting": "照明",
    "StaticCategories.HomeGarden.Organization": "整理・収納",
    "StaticCategories.HomeGarden.StationeryCrafts": "文房具＆クラフト",
    "StaticCategories.HomeGarden.TextilesPillows": "テキスタイル＆枕",
    "StaticCategories.HomeGarden.Tools": "ツール",

    "StaticCategories.Accessories": "アクセサリー",
    "StaticCategories.Accessories.Belts": "ベルト",
    "StaticCategories.Accessories.Cufflinks": "カフスボタン",
    "StaticCategories.Accessories.Hats": "帽子",
    "StaticCategories.Accessories.Keychains": "キーホルダー",
    "StaticCategories.Accessories.ScarvesBandanas": "スカーフ＆バンダナ",
    "StaticCategories.Accessories.Sunglasses": "サングラス",

    "StaticCategories.MensClothing": "紳士服",
    "StaticCategories.MensClothing.Activewear": "アクティブウェア",
    "StaticCategories.MensClothing.DressShirts": "ドレスシャツ",
    "StaticCategories.MensClothing.JacketsCoats": "ジャケット＆コート",
    "StaticCategories.MensClothing.Pants": "パンツ",
    "StaticCategories.MensClothing.Shorts": "ショーツ",
    "StaticCategories.MensClothing.Socks": "ソックス",
    "StaticCategories.MensClothing.SweatersHoodies": "セーター＆パーカー",
    "StaticCategories.MensClothing.Swimwear": "スイムウェア",
    "StaticCategories.MensClothing.TankTops": "タンクトップ",
    "StaticCategories.MensClothing.Tshirts": "Tシャツ",
    "StaticCategories.MensClothing.Underwear": "下着",

    "StaticCategories.SportsOutdoors": "スポーツ＆アウトドア",
    "StaticCategories.SportsOutdoors.Activewear": "アクティブウェア",
    "StaticCategories.SportsOutdoors.Biking": "自転車",
    "StaticCategories.SportsOutdoors.Camping": "キャンプ",
    "StaticCategories.SportsOutdoors.EquipmentAccessories": "機器＆アクセサリー",
    "StaticCategories.SportsOutdoors.Fishing": "釣り",

    "StaticCategories.Gifts": "ギフト",
    "StaticCategories.Gifts.Adults": "アダルト",
    "StaticCategories.Gifts.Funny": "ジョーク",
    "StaticCategories.Gifts.Mugs": "マグカップ",
    "StaticCategories.Gifts.Novelty": "ノベルティ",
    "StaticCategories.Gifts.Personalized": "パーソナライズ",
    "StaticCategories.Gifts.Religious": "信仰・宗教",

    "StaticCategories.Automotive": "自動車",
    "StaticCategories.BagsWallets": "バッグ＆財布",
    "StaticCategories.Seasonal": "季節物",
    "StaticCategories.Seasonal.Christmas": "クリスマス",
    "StaticCategories.Seasonal.FathersDay": "父の日",
    "StaticCategories.Seasonal.Halloween": "ハロウィーン",
    "StaticCategories.Seasonal.MothersDay": "母の日",

    "StaticCategories.FestivalsParties": "フェスティバル＆パーティー",
    "StaticCategories.FestivalsParties.PartySupplies": "パーティー用品",
    "StaticCategories.FestivalsParties.Wedding": "ウェディング",

    "QuickFilters.Label.Premium": "プレミアム",
    "QuickFilters.Label.FastUSAShipping": "迅速な米国発送",
    "QuickFilters.Label.Under5": "5ドル未満の米国の送料",
    "QuickFilters.Label.MoreThan": "More than {{ inventoryAmount }}", // * ENGLISH
    "QuickFilters.Label.ShowAll": "Show All", // * ENGLISH
    "QuickFilters.Label.ShipsFrom": "<1/> Ship from <2/> {{ country }}", // * ENGLISH
    "QuickFilters.Label.ShipsFromAnywhere": "Anywhere", // * ENGLISH

    "SortBy.Label.SortBy": "並び替え",
    "SortBy.DropDown.Item.Relevance": "関連",
    "SortBy.DropDown.Item.PriceLowToHigh": "価格：低から高",
    "SortBy.DropDown.Item.PriceHighToLow": "価格：高から低",
    "SortBy.DropDown.Item.Newest": "最新",
    "SortBy.DropDown.Item.ShippingTime": "配送時間",

    "Breadcrumb.Item.Home": "ホーム",
    "Breadcrumb.Item.Search": "検索",

    "UpgradeModal.Modal.Title": "料金プランを選択する",

    "Plans.ToggleSection.Monthly": "毎月",
    "Plans.ToggleSection.Yearly": "毎年",
    "Plans.ToggleSection.DiscountInitial": "まで取得",
    "Plans.ToggleSection.DiscountSingular": "ヶ月",
    "Plans.ToggleSection.DiscountPlural": "ヶ月",
    "Plans.ToggleSection.DiscountFinal": "OFF",
    "Plans.ProrationCost.TextInitial": "あなたは現在、支払いをしています",
    "Plans.ProrationCost.TextFinal": "/年追加のみでエンパイアにアップグレード",
    "Plans.MobileWarning": "Mobile app upgrades can only be modified through the app", // English

    "Card.Title.PeriodSingular": "ヶ月",
    "Card.Title.PeriodPlural": "ヶ月",
    "Card.Title.Off": "OFF",
    "Card.DescriptionVariantType.Starter": "販売を開始",
    "Card.DescriptionVariantType.Professional": "販売を伸ばす",
    "Card.DescriptionVariantType.Empire": "販売を最大化する",
    "Card.DescriptionVariantType.Unicorn": "大規模な販売管理",
    "Card.DescriptionVariantType.Period": "月",
    "Card.DescriptionVariantType.PricePeriod": "{{value}}/月",

    "Card.DescriptionVariantType.AnnualDescription": "毎年{{value}}ドル請求されます",
    "Card.DescriptionVariantType.MonthlyDescription": "{{value}}日間の無料トライアル後",
    "Card.DescriptionVariantType.CurrentPlan": "あなたの現在のプラン",
    "Card.DescriptionVariantType.Button.Start": "今すぐはじめる",
    "Card.DescriptionVariantType.Button.Try": "無料で試す",
    "Card.DescriptionVariantType.UniqueProducts": "ユニークな製品",
    "Card.DescriptionVariantType.PremiumProducts": "プレミアム製品",
    "Card.DescriptionVariantType.EmailSupport": "メールサポート",
    "Card.DescriptionVariantType.Invoicing": "ブランドインボイス",
    "Card.DescriptionVariantType.InvoicingTooltip":
      "ブランドインボイスを発行しているサプライヤーからのすべての注文に独自のロゴを追加して、あなたのブランドを構築します",
    "Card.DescriptionVariantType.ChatSupport": "チャットによるサポート",
    "Card.DescriptionVariantType.WinningProducts": "売れ筋商品",
    "Card.DescriptionVariantType.SupplierSourcing": "サプライヤーの調達",
    "Card.DescriptionVariantType.ProductRequests": "製品のリクエスト",
    "Card.DescriptionVariantType.ProductRequestsTooltip": "まだSpocketにない商品をリクエストする",
    "Card.DescriptionVariantType.BulkCheckout": "一括チェックアウト",
    "Card.DescriptionVariantType.BulkCheckoutTooltip":
      "ボタンをクリックするだけで複数の注文を一度にチェックアウト",
    "Card.DescriptionVariantType.Special": "スペシャル",

    "ReactivationBanner.Alert": "Spocketのサブスクリプションが終了しました。",
    "ReactivationBanner.InfoSubtitle": "再開します",
    "ReactivationBanner.CheckList.HighQuality": "高品質",
    "ReactivationBanner.CheckList.Curated": "キュレーション",
    "ReactivationBanner.CheckList.FastShipping": "迅速な配送",
    "ReactivationBanner.CheckList.FromUSAndEU": "米国と欧州から",
    "ReactivationBanner.TextByPlan.Starter.Description": "<1>製品のプッシュ</1>ができなくなります",
    "ReactivationBanner.TextByPlan.Starter.Title": "Spocket アカウント",
    "ReactivationBanner.TextByPlan.Starter.Subtitle": "今すぐストアに商品をプッシュしましょう",
    "ReactivationBanner.TextByPlan.Others.Description.PartOne":
      "<1>プッシュ製品</1>をライブまたは使用することができなくなります ",
    "ReactivationBanner.TextByPlan.Others.Description.PartTwo": "プレミアム製品",
    "ReactivationBanner.TextByPlan.Others.Title": "プレミアムアカウント",
    "ReactivationBanner.TextByPlan.Others.Subtitle": "以下のプレミアム商品にアクセスできます",
    "ReactivationBanner.Button": "今すぐアカウントを再開する",

    "AnnualPromotionModal.Header": "おめでとうございます、あなたは今{{planName}}プランです",
    "AnnualPromotionModal.CountdownTitle": "終了します",
    "AnnualPromotionModal.Button.Yes": "年間プランにアップグレードする",
    "AnnualPromotionModal.Button.No": "いいえ、月額プランのサブスクリプションを継続します",

    "UpgradeReasonModal.Benefits.IncreasedProducts": "より多くの製品をプッシュ",
    "UpgradeReasonModal.Benefits.UnlimitedOrders": "無制限のオーダー",
    "UpgradeReasonModal.Benefits.BrandedInvoicing": "ブランドインボイス",
    "UpgradeReasonModal.Benefits.PremiumProducts": "プレミアム製品",
    "UpgradeReasonModal.Benefits.ExclusiveDeals": "お得な情報",
    "UpgradeReasonModal.Benefits.ChatCallSupport": "チャット＆コールサポート",
    "UpgradeReasonModal.Modal.Title": "Spocketで実現したいことは何ですか？",
    "UpgradeReasonModal.Modal.Question": "アップグレードした理由は何ですか？",
    "UpgradeReasonModal.Modal.Button": "Spocket {{plan}}の使用を開始する",
    "UpgradeReasonModal.UpgradeComment.PlaceHolder": "お客様の体験を向上させることができます",

    "UpgradeSuccessModal.Col.One.A": "おめでとうございます。",
    "UpgradeSuccessModal.Col.One.B": "あなたは今{{alias}}プランです！",
    "UpgradeSuccessModal.Col.Two.A":
      "あなたはドロップシッピングビジネスを成功させるのに必要なすべてのツールのロックを解除しました。",
    "UpgradeSuccessModal.Col.Two.B": "今なら入手可能 ",
    "UpgradeSuccessModal.Col.Two.C": " ハッピー Spocketing!",
    "UpgradeSuccessModal.Button": "続ける",

    "Promotion.TrialDaysNormalizer.30days": "1ヶ月",
    "Promotion.TrialDaysNormalizer.28days": "4週間",
    "Promotion.TrialDaysNormalizer.21days": "3週間",
    "Promotion.TrialDaysNormalizer.14days": "2週間",
    "Promotion.TrialDaysNormalizer.7days": "1週間",
    "Promotion.TrialDaysNormalizer.1day": "1日",
    "Promotion.TrialDaysNormalizer.Days": "{{value}}日間",
    "Promotion.TrialDaysPlan.Title": "今SpocketProをお試しいただくと、2週間無料でご利用いただけます!",
    "Promotion.TrialDaysPlan.Text": "今SpocketProをお試しいただくと、{{value}}間無料でご利用いただけます!",
    "Promotion.Button": "無料でお試しください",
    "StickyPromotion.Text": "Spocket Proを無料でお試しください",
    "StickyPromotion.Button": "今すぐお試しください→",
    "Onboarding.Steps.Title": "ストアの売り上げを押し上げましょう！",
    "Onboarding.Steps.Subtitle":
      "Spocketのヒント：一般的なストアは、売上を得る前に25個の商品をプッシュします。",
    "Steps.ChecklistItem.Connect.Text": "アカウントを接続する",
    "Steps.ChecklistItem.Connect.Tooltip": "アカウントをShopifyまたはWooCommerceストアに接続します",
    "Steps.ChecklistItem.Connect.Disabled": "",
    "Steps.ChecklistItem.Search.Text": "製品の検索＆インポートリストへの追加",
    "Steps.ChecklistItem.Search.Tooltip":
      "米国/欧州に拠点を置くサプライヤーから素晴らしい商品を見つけて、インポートリストに追加してください。",
    "Steps.ChecklistItem.Search.Disabled": "",
    "Steps.ChecklistItem.Push.Text": "あなたのストアに商品をプッシュする",
    "Steps.ChecklistItem.Push.Tooltip":
      "インポートリスト内の商品をパーソナライズして、ワンクリックでストアにプッシュします。",
    "Steps.ChecklistItem.Push.Disabled": "",
    "Steps.ChecklistItem.Review.Text": "Spocket にレビューを投稿しましょう！",
    "Steps.ChecklistItem.Review.Tooltip": "これまでの経験にご満足ですか？他の人と共有しましょう！",
    "Steps.ChecklistItem.Review.Disabled": "アカウントを接続する",

    "BubbleWidget.Head.Title": "こんにちは",
    "BubbleWidget.Head.Subtitle": "Spocket サポートへようこそ",
    "BubbleWidget.HelpCenter.Title": "ヘルプセンター",
    "BubbleWidget.HelpCenter.Subtitle": "Spocket チームからのアドバイスと回答",
    "BubbleWidget.EmailUs.Title": "メールでのお問い合わせ",
    "BubbleWidget.EmailUs.Subtitle": "ご不明な点がありましたら、お気軽にお問い合わせください",
    "BubbleWidget.ChatWithUs.Title": "チャットでのお問い合わせ",
    "BubbleWidget.ChatWithUs.Subtitle.Basic": "プロ＆エンパイアユーザー向け",
    "BubbleWidget.ChatWithUs.Subtitle.NotBasic": "サポート担当者がお待ちしております",
    "BubbleWidget.ChatWithUs.Subtitle.Unlock": "今すぐロックを解除",
    "BubbleWidget.Community.Title": "コミュニティ",
    "BubbleWidget.Community.Subtitle": "50,000人以上のドロップシッパーのコミュニティに参加する",
    "BubbleWidget.StoreReviews.Title": "ストアレビュー",
    "BubbleWidget.StoreReviews.Subtitle": "プロ＆エンパイアユーザー",
    "BubbleWidget.StoreReviews.Unlock": "今すぐロックを解除",

    "Language.Title": "言語",

    "WhatYouWillLoseModal.Button.Offer": "続ける",
    "WhatYouWillLoseModal.Button.Downgrade": "見切りを付けて、アカウントをダウングレードします",
    "WhatYouWillLoseModal.ProductSection.Title":
      "<1>{{product_count}}つのインポートされた製品</1>はすべて失われます",
    "WhatYouWillLoseModal.Product.PremiumTag": "プレミアム",
    "WhatYouWillLoseModal.Product.SkeletonImage": "{{product_count}} 以上",
    "WhatYouWillLoseModal.ModalWrapper.Header": "もうおやめになりますか？",
    "WhatYouWillLoseModal.ModalWrapper.Title.Tag": "50％OFFをゲット",
    "WhatYouWillLoseModal.ModalWrapper.Title": "これから3ヶ月間、起業の旅を続けましょう",
    "WhatYouWillLoseModal.ModalWrapper.Subtitle":
      "新たな成功者になってください。すでに多くの時間を投資していらっしゃいますね。その調子で続けましょう。みんなであなたを応援しています。Spocket チーム",

    "FiftyOff3MonthsOfferSuccessModal.Header":
      "おめでとうございます！ これから3ヶ月間、プランに50％割引が追加されました!",
    "FiftyOff3MonthsOfferSuccessModal.Button": "続ける",

    "DowngradeReasonModal.DowngradeSection": "どうすればSpocketをもっと良く使えるようになるのでしょうか？",
    "DowngradeReasonModal.DowngradeSection.TextArea.PlaceHolder":
      "どんなことでも構いません。ご意見・ご感想をお願いします（100文字以上）",
    "DowngradeReasonModal.DowngradeSection.Tooltip": "ご意見・ご感想をご記入ください（100文字以上）",
    "DowngradeReasonModal.Button.Downgrade": "ダウングレードする",
    "DowngradeReasonModal.ModalWrapper.Header": "{{storeName}}をダウングレードしますか？",
    "DowngradeReasonModal.ModalWrapper.ContactUs": "お問い合わせ",
    "DowngradeReasonModal.ModalWrapper.Footer.Button.Cancel": "キャンセルする",

    "DowngradeSuccessModal.Header": "ダウングレード成功",
    "DowngradeSuccessModal.Body":
      "ご意見ありがとうございます。私たちは日々Spocketの改善に努めておりますが、またの機会を楽しみにしております！",

    "Settings.title": "設定",
    "Settings.buttonSaveChanges": "変更内容を保存する",
    "Settings.buttonSaveAndPreview": "保存してプレビューする",
    "Settings.PricingPlans.Title": "料金プラン",

    "Settings.MenuTab.Plans": "プラン",
    "Settings.MenuTab.Account": "アカウント",
    "Settings.MenuTab.BrandedInvoicing": "ブランドインボイス",
    "Settings.MenuTab.Billing": "請求",
    "Settings.MenuTab.GlobalPricingRules": "グローバルな価格設定ルール",
    "Settings.MenuTab.Security": "セキュリティ",

    "AccountTab.documentTitle": "設定 - アカウント - Spocket",
    "AccountTab.title": "アカウントの設定",
    "AccountTab.shopName": "ショップ名",
    "AccountTab.email": "Eメール",
    "AccountTab.shopUrl": "ショップのURL",
    "AccountTab.defaultCurrency": "デフォルトの通貨",
    "AccountTab.yourPlan": "あなたのプラン",
    "AccountTab.accountNotActive": "あなたのアカウントは現在アクティブではありません",
    "AccountTab.alertFeatureWillBeAddedSoon":
      "この機能はまもなく追加されます！今はひとまず、Spocket Shopifyアプリから接続してみてください！",
    "AccountTab.alertAccountSettingsUpdated": "アカウント設定が更新されました",
    "AccountTab.alertInvalidShopUrl": "無効なショップURL",
    "AccountTab.productsImported": "インポートされた製品",
    "AccountTab.products": "製品",
    "AccountTab.premiumProducts": "プレミアム製品",
    "AccountTab.total": "合計",
    "AccountTab.signOut": "サインアウト",
    "AccountTab.limitReachedProductsAndPremium": "製品・プレミアム製品が上限に達しました。",
    "AccountTab.limitReachedProducts": "製品の制限に達しました。",
    "AccountTab.limitReachedPremium": "プレミアム製品の制限に達しました。",
    "AccountTab.buttonSwitchToAnnualPlan": "年間プランに切り替える",
    "AccountTab.off30Percent": "30% OFF",
    "AccountTab.off40Percent": "40% OFF",
    "AccountTab.off45Percent": "45% OFF",
    "AccountTab.sellMoreWithEmpirePlan": "エンパイアプランでもっと売る",
    "AccountTab.tooltipCurrency":
      "お客様の通貨はストアアカウントで管理されています。インポートした製品の価格はすべてその通貨に換算されます。",
    "AccountTab.shopNotConnectedYet": "あなたのショップはこのアカウントとはまだ接続していません。",
    "AccountTab.connectYourShop": "ショップを接続する",

    "InvoiceTab.documentTitle": "設定 - 請求書 - Spocket",
    "InvoiceTab.alertInvoiceSettingSaved": "請求書の設定が保存されました！",
    "InvoiceTab.shopLogo": "ショップロゴ",
    "InvoiceTab.contactEmail": "連絡先メールアドレス",
    "InvoiceTab.phoneNumber": "電話番号",
    "InvoiceTab.personalNote": "個人的なメモ",
    "InvoiceTab.tooltipPersonalNote": "ブランド化された各請求書に含まれる個人的なメモを設定します",
    "InvoiceTab.brandedInvoicing": "ブランドインボイス",
    "InvoiceTab.tooltipBrandedInvoicing":
      "有料プランをご利用の場合、ブランドのロゴと個人的なメモを、ブランドの請求書を提供しているサプライヤーからのすべての注文に追加します",
    "InvoiceTab.disabledInvoicing": "すべての注文にブランド化された請求書を含める",
    "InvoiceTab.tooltipDisabledInvoicing":
      "このオプションをオフにすると、注文時にブランド化された請求書が除外されます。",

    "PricingTab.titleDefaultPricingRules": "デフォルトの価格設定ルール",
    "PricingTab.tooltipTitleDefaultPricingRules":
      "ここから、すべての製品に適用される固定の利幅または乗数を割り当てることができます。",
    "PricingTab.titleAdvancedPricingRules": "高度な価格設定ルール",
    "PricingTab.tooltipTitleAdvancedPricingRules":
      "高度なルールを使用すると、製品の価格範囲に基づいて利幅または乗数を設定できます。",
    "PricingTab.assignCents": "数値を割り当てる",
    "PricingTab.tooltipAssignCents":
      "この値は、商品の最終価格を表示する際に使用されます（例えば、商品の価格をXX.99に設定したい場合は、以下のフィールドに99を追加します）。",
    "PricingTab.Markup": "利幅",
    "PricingTab.MarkupType": "利幅タイプ",
    "PricingTab.SelectDefault": " --  一つ選択してください  -- ",
    "PricingTab.SelectPercent": "パーセント",
    "PricingTab.SelectMultiplier": "乗数",
    "PricingTab.SelectFixed": "固定の",
    "PricingTab.titlePricingRules": "設定 - 価格設定ルール - Spocket",
    "PricingTab.toggleAdvancedPricingRules": "高度な価格設定ルールを切り替える",
    "PricingTab.from": "から",
    "PricingTab.to": "まで",
    "PricingTab.selectFixedAmount": "定額",
    "PricingTab.buttonRemove": "削除する",
    "PricingTab.alertCannotCreateMoreThanOneRuleWithEmptyFields":
      "空のフィールドで複数のルールを作成することはできません",
    "PricingTab.costRange": "コスト範囲",
    "PricingTab.markup": "利幅",
    "PricingTab.add": "追加",

    "SecurityTab.Document.Title": "設定 - セキュリティ - Spocket",
    "SecurityTab.alertIncorrectPassword": "パスワードが正しくありません",
    "SecurityTab.title": "セキュリティ",
    "SecurityTab.yourNewPassword": "新しいパスワード",
    "SecurityTab.repeatPassword": "パスワードを再度入力してください",
    "SecurityTab.errorPleaseEnterAPassword": "パスワードを入力してください。",
    "SecurityTab.errorPasswordsConfirmationNeeded": "パスワードの確認を入力してください。",
    "SecurityTab.errorPasswordsDoNotMatch": "パスワードが一致していません",
    "SecurityTab.errorPasswordShort": "パスワードは8文字以上である必要があります",

    "ListingCards.TopSupplierTag.Tooltip":
      "トップサプライヤーは、高品質の製品、優れたサービス、高い評価で知られています",
    "ListingCards.TopSupplierTag.Text": "サプライヤー",

    "ListingCard.OriginCountry.Intro": "まで",
    "ListingCard.OriginCountry.Tooltip": "発送元",
    "ListingCard.Shipping.Price.Title": "配送料",
    "ListingCard.Shipping.Price.Free": "無料",
    "ListingCard.Price.Intro": "リスティング費用",
    "ListingCard.Price.Retail": "小売価格",
    "ListingCard.Shipping.Time.Title": "配送時間",
    "ListingCard.Shipping.Time.Period": "数日間",
    "ListingCard.PremiumIcon.Tooltip": "独占的で、割引率が高く、出荷が迅速な商品を売ってください",
    "ListingCard.PremiumIcon.Text": "プレミアム",
    "ListingCard.ListButton.Import": "インポートリストに追加する",
    "ListingCard.ListButton.Remove": "インポートリストから削除する",
    "ListingCard.ListButton.Pushed": "ストアにて販売する",
    "ListingCard.StatusTag.Imported.Title": "輸入品",
    "ListingCard.StatusTag.Imported.Text": "この品目は輸入品目録にすでに存在します",
    "ListingCard.StatusTag.Pushed.Title": "ストアに入庫",
    "ListingCard.StatusTag.Pusehd.Text": "この品目はストアにプッシュされました",

    "ListingModal.MainSection.Title": "製品説明",
    "ListingModal.DetailsSection.Button.ProductVariations": "製品バリエーションを開く",
    "ListingModal.DetailsSection.Button.OrderSamples": "サンプルを注文する",
    "ListingModal.DetailsSection.Button.OrderSamples.New": "NEW",
    "ListingModal.DetailsSection.BrandedInvoicing.Alert":
      "この製品では、ブランド化された請求書の発行は利用できません",
    "ListingModal.DetailsSection.InternationalShipping.Alert": "海外オーダーは中国の倉庫から発送されます",
    "ListingModal.DetailsSection.StockUsa.Alert":
      "米国の倉庫で在庫切れの商品は、中国の倉庫から発送される場合があります",
    "ListingModal.DetailsSection.MultiplePackage.Alert":
      "ご注文の全体的な配送時間を短縮するため、複数のパッケージで送信される場合があります",
    "ListingModal.DetailsSection.ConnectStore.Alert": "ストアを接続してオーダーする",
    "ListingModal.DetailsSection.PushedListButton": "ストアにて販売する",
    "ListingModal.DetailsSection.RemoveListButton": "リストから削除する",
    "ListingModal.DetailsSection.ImportListButton": "インポートリストに追加する",
    "ListingModal.DetailsSection.ImportListButton.Deactivated": "リストを非アクティブ化する",

    "InfoSection.ShippingTime.Tooltip": "発送後のお届けまでの日数",
    "InfoSection.ShippingTime.Title": "配送時間",
    "InfoSection.ShippingInfo.Worldwide": "ワールドワイド",
    "InfoSection.ShippingExcluded.Intro": "次の国には発送されません",
    "InfoSection.ShippingExcluded.Various": "各種",
    "InfoSection.ProcessingTime.Tooltip": "サプライヤーが出荷し、追跡番号を提供するまでの営業日数",
    "InfoSection.ProcessingTime.Title": "処理時間",
    "InfoSection.ProcessingTime.Period": "営業日",
    "InfoSection.ShippingInfoLine.Tooltip":
      "この商品は{{price_formatted}}で出荷され、同じ注文で追加の商品を注文するたびに{{incremental_price_formatted}}が加算されます。",
    "InfoSection.ShippingInfoLine.Period": "営業日",
    "InfoSection.ShippingInfoLine.Free": "無料",
    "InfoSection.ShippingInfoLine.NoShipping": "出荷されません",

    "ReturnPolicySection.Title": "返品ポリシー",

    "TitleSection.TitleCountryOrigin.CountryOrigin.Intro": "から",
    "TitleSection.TitleCountryOrigin.SupplierShopName.Intro": "まで",
    "TitleSection.PriceMSRP.Listing": "表示価格",
    "TitleSection.PriceMSRP.Retail": "小売価格",

    "ProductVariationsModal.Title": "製品バリエーション",
    "ProductVariationsModal.Table.Image": "画像",
    "ProductVariationsModal.Table.Inventory": "在庫",
    "ProductVariationsModal.Table.Price": "価格",
    "ProductVariationsModal.ImageSpecifications.Title": "サイズ表",
    "ProductVariationsModal.ImageSpecifications.Button": "ダウンロード",

    "TopSupplier.Tooltip": "トップサプライヤーは、高品質の製品、優れたサービス、高い評価で知られています",
    "TopSupplier.Text": "トップサプライヤー",

    "BestSelling.Tooltip.Top": "これはSpocketで最高のパフォーマンスを発揮する製品です",
    "BestSelling.Tooltip.Bottom": "ベストセラー",

    "GallerySection.PremiumIcon.Tooltip": "独占的で、割引率が高く、出荷が迅速な商品を売ってください",
    "GallerySection.PremiumIcon.Text": "プレミアム",
    "GallerySection.DiscountStamp.Text": "さらに{{value}}％OFF",

    "Upgrade.Title.AnnualToggled": "今すぐSpocketプレミアムを入手",
    "Upgrade.Title.MonthlyToggled": "Spocketプレミアムを14日間無料で試す",
    "Upgrade.Subtitle":
      "今すぐSpocketプレミアムプランを試して、米国とヨーロッパからの高コンバージョン商品をストアに追加してみましょう。",
    "Upgrade.Button": "Spocketプレミアムを使わずに続ける",

    "Search.NoProductsFound.Title": "申し訳ありません！結果は見つかりませんでした",
    "Search.NoProductsFound.For": "次の条件では",
    "Search.NoProductsFound.Description":
      "スペルを確認し、関連する検索用語またはより一般的な検索用語を試してみてください。",
    "Search.Searching.Title": "商品を探しています...",
    "Search.Searching.Description": "最新の製品がロードされるまでお待ちください。",

    "Suppliers.StarRating.Tooltip": "サプライヤーのフルフィルメント成功率",
    "Suppliers.RefundPolicy": "サプライヤーの返金ポリシー",
    "Suppliers.Joined.Title": "Spocket に参加しました",
    "Suppliers.Origin.Title": "国からの発送",
    "Suppliers.Time.Title": "平均処理時間",
    "Suppliers.HasMore.Title": "商品を探しています...",
    "Suppliers.HasMore.Subtitle": "最新の製品がロードされるまでお待ちください。",
    "Suppliers.TopSupplierTag.Tooltip":
      "トップサプライヤーは、高品質の製品、優れたサービス、高い評価で知られています",
    "Suppliers.TopSupplierTag.Text": "トップサプライヤー",

    "AltTextModal.Header.Title": "画像の詳細を編集する",
    "AltTextModal.Body.Description":
      "この画像の簡単な説明を書いて、視覚障害のある顧客の検索エンジン最適化（SEO）とアクセシビリティを改善します。",
    "AltTextModal.Input.Label": "代替テキスト",
    "AltTextModal.Input.Placeholder": "画像代替テキスト",
    "AltTextModal.Button.Cancel": "キャンセルする",
    "AltTextModal.Button.Save": "保存する",

    "WistiaModal.WhatIsSpocket.Title": "Spocketとは?",
    "WistiaModal.WhatIsSpocket.Text":
      "Spocketがどのようにビジネスの構築に役立つかを学びましょう。Spocketの仕組みを理解し、どのように活用すればいいのかを理解しましょう。",
    "WistiaModal.WhatIsSpocket.Button": "製品の検索を開始する",
    "WistiaModal.DiscoverProducts.Title": "製品の紹介",
    "WistiaModal.DiscoverProducts.Text":
      "フィルタを適切に利用して、適切な商品を見つけ、お店に加えてください。",
    "WistiaModal.DiscoverProducts.Button": "製品の検索を開始する",
    "WistiaModal.ProductCustomization.Title": "製品のカスタマイズ",
    "WistiaModal.ProductCustomization.Text":
      "インポートリストを使用して、ストアに合わせて商品を変更します。商品説明の編集、価格の設定、商品をコレクションに追加するほか、画像を削除することができます。",
    "WistiaModal.ProductCustomization.Button": "インポートリストに移動する",
    "WistiaModal.OrderProcessing.Title": "自動オーダー処理",
    "WistiaModal.OrderProcessing.Text":
      "お客様のご注文を満たし、ワンクリックでサプライヤがお客様の玄関先まで製品をお届けします。",
    "WistiaModal.OrderProcessing.Button": "オーダーに移動する",
    "WistiaModal.Settings.Title": "設定",
    "WistiaModal.Settings.Text":
      "設定ページでは、すべてのアカウント情報の管理や請求書のブランド化、クレジットカードの追加を行うことができます。すべての製品の価格設定ルールを調整し、サブスクリプションプランを選択することもできます。",
    "WistiaModal.Settings.Button": "アカウントを設定する",

    "Footer.Copyright": "Copyright {{year}}, Spocket無断複写・転載を禁じます",
    "Footer.PrivacyPolicy": "個人情報保護方針",
    "Footer.TermsConditions": "ご利用規約",
    "Footer.DataProcessingAddendum": "データ処理覚書",

    "AlibabaOrderDetails.Title": "Order Shipments", // English
    "AlibabaOrderDetails.Subtitle": "This order is divided into multiple shipments, and each can be accessed at alibaba.com", // English
    "AlibabaOrderDetails.TableHeader.OrderId": "Order ID", // English
    "AlibabaOrderDetails.TableHeader.Status": "Status", // English
    "AlibabaOrderDetails.TableHeader.Action": "Action", // English
    "AlibabaOrderDetails.Button.OpenOrder": "Open Order", // English

    "Maintenance.GoBackHome": "Go Back Home", //English
    "Maintenance.MainMessage": "<1>Spocket will be back soon! <2>Spocket is running into some issues, but we're fixing it as we speak.</2><1/>", //English

    "Products.Search.Filter.Button": "Filter", //English
    "Products.Filters.Option.LowStock": "Low stock (less than 10)", //English
    "Products.Filters.Option.OutOfStock": "Out of stock", //English
    "Products.Filters.Option.Deactivated": "Deactivated product", //English
    "Products.Filters.Option.Default": "Select status", //English
    "Products.Filters.Title": "Filter", //English
    "Products.Filters.Subtitle": "Inventory Status", //English
    "Products.Filters.Button.Reset": "Reset", //English
    "Products.Filters.Button.Title.Reset": "Reset all filter options", //English
    "Products.Filters.Button.Apply": "Apply Filter", //English
    "Products.Filters.Button.Title.Apply": "Apply selected filters", //English
    "Products.Filters.Tag.InventoryStatus": "Inventory status: ", //English

    "CardImage.ArrowContainer.NextImage": "Next image", //English
    "CardImage.ArrowContainer.PreviousImage": "Previous image", //English
  }
};



// WEBPACK FOOTER //
// ./src/utils/i18n/ja.js