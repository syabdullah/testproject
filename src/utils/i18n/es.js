export default {
  translation: {
    "OrderList.Header.Title": "Mi lista de pedidos",
    "OrderList.Input.Search": "Número de pedido...",
    "OrderList.Label.Status": "Filtrar por estado en Spocket",

    "order.status.unpaid": "Sin pagar",
    "order.status.paid": "Pagado",
    "order.status.processing": "Procesando",
    "order.status.shipped": "Enviado",
    "order.status.cancelled": "Cancelado",
    "order.status.pending": "Pendiente",
    "order.status.partially_paid": "Pagado parcialmente",
    "order.status.partially_refunded": "Reembolsado parcialmente",
    "order.status.refunded": "Reembolsado",
    "order.status.voided": "Inválido",
    "order.status.authorized": "Autorizado",
    "order.status.deleted": "Eliminado",
    "order.status.pending_payment_confirmation": "Pendiente",

    "OrderList.Label.DownloadHistory": "Descargar archivo CSV con todo el historial de pedidos",
    "OrderList.Document.Title": "Pedidos - Spocket",
    "OrderList.EmptyOrders.Link.SearchProducts": "Buscar productos",
    "OrderList.EmptyOrders.Tip.HowToProcessOrders": "Cómo procesar los pedidos",
    "OrderList.EmptyOrders.Message.Loading.Title": "Estamos cargando tus pedidos.",
    "OrderList.EmptyOrders.Message.Loading.Description": "Por favor espera mientras buscamos tus pedidos.",
    "OrderList.EmptyOrders.Message.Title": "¡Tu lista de pedidos está vacía!",
    "OrderList.EmptyOrders.Message.Description":
      "Puedes gestionar y procesar tus pedidos aquí. Visita la página de búsqueda para comenzar a agregar productos a tu lista de importación.",
    "OrderList.CheckBox.SelectAllOrders": "Seleccionar todos los pedidos",
    "OrderList.CheckBox.SelectedXOrders": "{{count}} pedido seleccionado",
    "OrderList.CheckBox.SelectedXOrders_plural": "{{count}} pedido seleccionado",
    "OrderList.CheckBox.BulkCheckoutOrders": "Finalización en bloque del pedido",
    "OrderList.CheckBox.BulkCheckoutOrders_plural": "Finalización en bloque de los pedidos",

    "RefreshModal.Button.SynchronizeOrders": "Sincronizar pedidos",
    "RefreshModal.Button.Cancel": "Cancelar",
    "RefreshModal.Button.Synchronize": "Sincronizar",
    "RefreshModal.Modal.Body":
      "Los pedidos se sincronizan automáticamente desde tu tienda. Solo se sincroniza si la información del pedido no aparece o no se ha actualizado. Actualiza la página después de 30 segundos.",

    "Order.Label.OrderNumber": "Número de pedido",
    "Order.Label.Date": "Fecha",
    "Order.Label.OrderStatus": "Estado del pedido {{integrationName}}",
    "Order.Table.Th.Product": "Producto",
    "Order.Table.Th.Qty": "CANT.",
    "Order.Table.Th.UnitPrice": "Precio por unidad",
    "Order.Table.Th.CheckoutDate": "Fecha de finalización",
    "Order.Table.Th.Action": "Acción",

    "CustomerModal.Button.ViewCustomerInfo": "Ver info. del cliente",
    "CustomerModal.Modal.Title.CustomerInfo": "Info. del cliente",
    "CustomerModal.Modal.Body.CustomerInfo": "Info. del cliente",
    "CustomerModal.Modal.Body.Address": "Dirección",

    "OrderLine.Button.Checkout": "Finalizar pedido",
    "OrderLine.Tooltip.PreviewInvoice": "Vista previa de la factura",
    "OrderLine.Tooltip.PaymentReceipt": "Recibo de pago",
    "OrderLine.Tooltip.TrackOrder": "Seguimiento del pedido",
    "OrderLine.Tooltip.OrderProcessing": "Procesamiento del pedido",
    "OrderLine.Tooltip.OrderCancelled": "Pedido cancelado",
    "OrderLine.Tooltip.PleaseConfirm": "Haz clic para confirmar el pago de tu pedido",
    "OrderLine.Label.PurchaseEtsy": "Comprar en Etsy",
    "OrderLine.Paying": "Pagando",
    "OrderLine.Failure": "Fallo",
    "OrderLine.Sample": "Muestra",
    "OrderLine.ErrorOrderRow":
      "No se puede encontrar la lista solicitada en el sistema. Ponte en contacto con el servicio de ayuda.",

    "ConfirmationModal.Label.OrderDetails": "Detalles del pedido",
    "ConfirmationModal.Label.Total": "Total",
    "ConfirmationModal.Label.Shipping": "Envío",
    "ConfirmationModal.Label.TransactionFees": "Costes de la transacción",
    "ConfirmationModal.Tooltip.TransactionFees":
      "Los costes de la transacción incluyen las tarifas que cobran Stripe, el proveedor de pagos de Spocket, así como también las tarifas por servicio.",
    "ConfirmationModal.Modal.OrderConfirmation": "Confirmación del pedido",
    "ConfirmationModal.Modal.Alert.Attention": "¡Atención!",
    "ConfirmationModal.Modal.Alert.Description": "Este pedido contiene una nota del cliente.",
    "ConfirmationModal.Modal.YoureAboutToPlaceOrder": "Estás a punto de realizar un pedido para",
    "ConfirmationModal.Modal.Table.Th.Name": "Nombre",
    "ConfirmationModal.Modal.Table.Th.Price": "Precio",
    "ConfirmationModal.Modal.Table.Th.Qty": "CANT.",
    "ConfirmationModal.Modal.Table.Th.Total": "Total",
    "ConfirmationModal.Modal.Label.Note": "Nota al proveedor",
    "ConfirmationModal.Modal.PlaceHolder.Note": "Tu mensaje",
    "ConfirmationModal.Button.PlaceOrder": "Realizar pedido",

    "PaymentCompleteModal.PaymentCompleted": "Pago completado",
    "PaymentCompleteModal.PaymentCompleted.Note":
      "Gracias por el pago. Hemos notificado al proveedor y tu pedido se procesará a la brevedad. Actualizaremos el estado del pedido y agregaremos el número de seguimiento en la página de tus pedidos.",
    "PaymentCompleteModal.PaymentIncomplete": "¡Tu pedido está incompleto!",
    "PaymentCompleteModal.PaymentIncomplete.BankRequiresConfirmation.Note":
      "Tu banco requiere que confirmes tu pago para proceder",
    "PaymentCompleteModal.PaymentIncomplete.ConfirmationLink": "Usa este enlace para confirmar el pago.",
    "PaymentCompleteModal.PaymentIncomplete.Note":
      "Una vez que el pago esté confirmado, se notificará al proveedor y procesaremos tu pedido como lo hacemos habitualmente. Las noticias sobre el estado y el seguimiento se agregarán a la página de tus pedidos. Vuelve a cargar la página después de la confirmación.",

    "SetYourGoalsModal.Title": "Número de productos agregados a la tienda",
    "SetYourGoalsModal.Subtitle": "Una tienda típica promociona 25 productos antes de obtener ventas",
    "SetYourGoalsModal.DropdownItem.Product": "{{count}} producto",
    "SetYourGoalsModal.DropdownItem.Product_plural": "{{count}} productos",
    "SetYourGoalsModal.Button": "Establecer mi objetivo y comenzar con el dropshipping",

    "YourGoalsBanner.Container.Description": "Tus objetivos",
    "YourGoalsBanner.Header.Title": "Comenzar una empresa",
    "YourGoalsBanner.Header.Subtitle": "Prepara tu tienda",
    "YourGoalsBanner.Progress.Completed": "Completados",
    "YourGoalsBanner.ProductPushedCount": "<0>Objetivo: {{goalsNumberOfProduct}}</0> productos promocionados",
    "YourGoalsBanner.CheckPoints.JoinSpocket": "Únete a Spocket",
    "YourGoalsBanner.CheckPoints.FirstSearch": "Primera búsqueda",
    "YourGoalsBanner.CheckPoints.ProductsPushed":
      "{{count}} / {{goalsNumberOfProduct}} producto promocionado",
    "YourGoalsBanner.CheckPoints.ProductsPushed_plural":
      "{{count}} / {{goalsNumberOfProduct}} productos promocionados",
    "YourGoalsBanner.CheckPoints.ProductsImported": "{{count}} / {{goalsNumberOfProduct}} producto importado",
    "YourGoalsBanner.CheckPoints.ProductsImported_plural":
      "{{count}} / {{goalsNumberOfProduct}} productos importados",

    "Plan.Starter": "Starter",
    "Plan.Professional": "Professional",
    "Plan.Empire": "Empire",
    "Plan.Unicorn": "Unicorn",

    "Aliscraper.Title": "Dropshipping automatizado de AliExpress",
    "Aliscraper.Subtitle":
      "Importa miles de productos de AliExpress a tu tienda de eCommerce con un solo clic y automatiza el dropshipping.",
    "Aliscraper.Features.Feature1": "Importación rápida con un solo clic",
    "Aliscraper.Features.Feature2": "Procesa cientos de pedidos de manera instantánea con Spocket",
    "Aliscraper.Features.Feature3": "Servicio de atención al cliente 24/7",
    "Aliscraper.Button": "Descarga la extensión",
    "Aliscraper.Chrome": "Disponible en la tienda web de Chrome",

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

    "ConnectStoreModal.Header.Title": "Conecta tu tienda",
    "ConnectStoreModal.Footer.Text": "Elige tu plataforma para comenzar",
    "ConnectStoreModal.ShopifyForm.UrlText": "URL de la tienda de Shopify",
    "ConnectStoreModal.ShopifyForm.InvalidName": "El nombre de la tienda no es válido",
    "ConnectStoreModal.ShopifyForm.Placeholder": "p. ej.: MyStore",
    "ConnectStoreModal.ShopifyForm.FooterText": "¿No tienes una tienda?",
    "ConnectStoreModal.ShopifyForm.FooterLink": "Pruébala gratis",
    "ConnectStoreModal.ShopifyForm.Button": "Conectar tienda",
    "ConnectStoreModal.WoocommerceInstruction.StoreIdText": "Tu clave de autenticación:",
    "ConnectStoreModal.WoocommerceInstruction.Intro": "Cómo conectar tu tienda a Spocket:",
    "ConnectStoreModal.WoocommerceInstruction.Step1": "Instala el complemento de Spocket desde",
    "ConnectStoreModal.WoocommerceInstruction.Step1Link": "aquí",
    "ConnectStoreModal.WoocommerceInstruction.Step2": "Activa el complemento en tu página de complementos",
    "ConnectStoreModal.WoocommerceInstruction.Step3": "Ve al panel de WordPress > Spocket",
    "ConnectStoreModal.WoocommerceInstruction.Step4":
      "Pega tu clave de autenticación (aparece arriba) y haz clic en «Guardar»",
    "ConnectStoreModal.WoocommerceInstruction.Trouble": "¿Tienes algún problema?",
    "ConnectStoreModal.WoocommerceInstruction.TroubleLink": "Contáctanos aquí",
    "ConnectStoreModal.WoocommerceInstruction.Button": "Listo",
    "ConnectStoreModal.WixForm.FooterText": "¿No tienes una tienda?",
    "ConnectStoreModal.WixForm.FooterLink": "Pruébala gratis",
    "ConnectStoreModal.WixForm.Button": "Conectar tienda",
    "ConnectStoreModal.FelexForm.FooterText": "¿No tienes una tienda?",
    "ConnectStoreModal.FelexForm.FooterLink": "Pruébala gratis",
    "ConnectStoreModal.FelexForm.Button": "Conectar tienda",
    "ConnectStoreModal.BigcommerceForm.UrlText": "URL de la tienda Bigcommerce",
    "ConnectStoreModal.BigcommerceForm.InvalidName": "El nombre de la tienda no es válido",
    "ConnectStoreModal.BigcommerceForm.Placeholder": "p. ej.: MyStore",
    "ConnectStoreModal.BigcommerceForm.FooterText": "¿No tienes una tienda?",
    "ConnectStoreModal.BigcommerceForm.FooterLink": "Pruébala gratis",
    "ConnectStoreModal.BigcommerceForm.Button": "Conectar tienda",
    "ConnectStoreModal.EcwidForm.FooterText": "¿No tienes una tienda?",
    "ConnectStoreModal.EcwidForm.FooterLink": "Pruébala gratis",
    "ConnectStoreModal.EcwidForm.Button": "Conectar tienda",
    "ConnectStoreModal.SquarespaceForm.FooterText": "¿No tienes una tienda?",
    "ConnectStoreModal.SquarespaceForm.FooterLink": "Pruébala gratis",
    "ConnectStoreModal.SquarespaceForm.Button": "Conectar tienda",
    "ConnectStoreModal.SquareForm.FooterText": "¿No tienes una tienda?",
    "ConnectStoreModal.SquareForm.FooterLink": "Pruébala gratis",
    "ConnectStoreModal.SquareForm.Button": "Conectar tienda",
    "ConnectStoreModal.FelexButton.Explanation":
      "Plataforma de creación de tiendas web que permite a los empresarios crear una tienda de dropshipping en menos de 10 minutos.",

    "PaymentTab.Document.Title": "Ajustes - Automatización - Spocket",
    "PaymentTab.Title.Billing": "Facturación",
    "PaymentTab.Tooltip.Billing":
      "Las tarjetas de crédito se usarán para el procesamiento del pedido y los pagos de la suscripción",
    "PaymentTab.AccordionItem.PauseChangeYourPlan": "Pausar o cambiar tu plan",
    "PaymentTab.AccordionItem.Label.ChangeYourPlan": "Cambiar tu plan",
    "PaymentTab.AccordionItem.Button.Downgrade": "Bajar de categoría",
    "PaymentTab.AccordionItem.Label.PauseYourPlan": "Pausar tu plan",
    "PaymentTab.AccordionItem.Label.StoreHasBeenPaused": "Tu tienda ya estuvo pausada anteriormente",
    "PaymentTab.AccordionItem.Button.PauseYourPlan": "Pausar tu plan",
    "PaymentTab.AccordionItem.Tooltip.PauseStore":
      "Puedes pausar tu cuenta de Spocket de manera temporal y regresar a ella sin perder ningún dato.",
    "PaymentTab.AccordionItem.Label.RemindMeLater": "Recuérdamelo más tarde",
    "PaymentTab.AccordionItem.Button.RemindMeLater": "Recuérdamelo más tarde",
    "PaymentTab.AccordionItem.Tooltip.RemindMeLater.3DaysBefore": "3 días antes",
    "PaymentTab.AccordionItem.Tooltip.RemindMeLater":
      "Conservar mis beneficios y recordarme <1>{{daysBefore}}</1> sobre la renovación de mi membresía",
    "RemindMeLaterModal.Header.ReminderSet": "Recordatorio establecido",
    "RemindMeLaterModal.Body.DaysBefore": "te enviaremos un correo electrónico 3 días antes de que",
    "RemindMeLaterModal.Body.ReminderSet":
      "El recordatorio ya está establecido y <1>{{daysBefore}}</1> se renueven tus beneficios. Hasta entonces, sigue avanzando en tu camino empresarial.",
    "RemindMeLaterModal.Button.Continue": "Continuar",
    "PauseStoreModal.Title.PauseYourStore": "Pausar tu tienda",
    "PauseStoreModal.Description.PauseYourStore":
      "Aprovecha esta oferta única y reduce el precio de tu plan un 70 % durante los próximos 30 días",
    "PauseStoreModal.Button.PauseStore": "Pausar tienda",
    "PauseStoreModal.Description.StorePaused":
      "Pausamos tu tienda y la suscripción del próximo mes se reducirá un 70 %. Ten en cuenta que después de ese periodo volverás a los pagos regulares.",
    "ConfirmPasswordModal.Title": "Confirma tu contraseña",
    "ConfirmPasswordModal.SubTitle": "Por razones de seguridad, confirma tu contraseña",
    "ConfirmPasswordModal.Input.Placeholder": "Tu contraseña",
    "ConfirmPasswordModal.Button.Cancel": "Cancelar",
    "ConfirmPasswordModal.Button.Confirm": "Confirmar",

    "NewPasswordForm.Title": "Please set a password before logging out!", // English
    "NewPasswordForm.PasswordInput.Placeholder": "New Password", // English
    "NewPasswordForm.ConfirmPasswordInput.Placeholder": "Confirm New Password", // English

    "Config.MomentJs.Locale": "es",
    "Config.Plan.Starter": "Starter",
    "Config.Plan.Professional": "Pro",
    "Config.Plan.Empire": "Empire",
    "Config.Plan.Unicorn": "Unicorn",

    "UpgradeConfirmationModal.Header.Title": "Crece más rápido con Spocket ",
    "UpgradeConfirmationModal.Body.Title": "Elige tu ciclo de facturación",
    "UpgradeConfirmationModal.BulletPoints.Trial.Initial": "Tus primeros",
    "UpgradeConfirmationModal.BulletPoints.Trial.BeforeNumber": "",
    "UpgradeConfirmationModal.BulletPoints.Trial.AfterNumber": "días ",
    "UpgradeConfirmationModal.BulletPoints.Trial.Final":
      "son gratis, cancela durante el periodo de prueba o cuando este finalice",
    "UpgradeConfirmationModal.BulletPoints.FirstBill": "Tu primera factura se programará para",
    "UpgradeConfirmationModal.BulletPoints.FirstBillNoTrial":
      "Tu primera factura se deberá abonar después de la confirmación",
    "UpgradeConfirmationModal.BulletPoints.Recurrence": "La facturación se realizará de manera mensual",
    "UpgradeConfirmationModal.MonthlyTab.RateType": "Mensualmente ",
    "UpgradeConfirmationModal.MonthlyTab.RateFrequency": "por mes",
    "UpgradeConfirmationModal.YearlyTab.RateType": "Anualmente ",
    "UpgradeConfirmationModal.YearlyTab.RateFrequency": "por mes",
    "UpgradeConfirmationModal.YearlyTab.Discount": "de descuento",
    "UpgradeConfirmationModal.TaxRates.Text": "impuesto sobre las ventas",
    "UpgradeConfirmationModal.TaxRates.Period": "mes",
    "UpgradeConfirmationModal.YearlyPanel.PayNow": "Para pagar ahora",
    "UpgradeConfirmationModal.YearlyPanel.PerMonth": "por mes X 12 meses",
    "UpgradeConfirmationModal.YearlyPanel.Savings": "Tus ahorros: ",
    "UpgradeConfirmationModal.YearlyPanel.Period": "por año",
    "UpgradeConfirmationModal.YearlyPanel.EquivalentInitial": "equivalente a",
    "UpgradeConfirmationModal.YearlyPanel.EquivalentFinal": "% de descuento",
    "UpgradeConfirmationModal.YearlyPanel.Warning.Trial": "Los planes anuales no tienen periodo de prueba",
    "UpgradeConfirmationModal.YearlyPanel.Warning.Charge":
      "Se te cobrará el importe completo de manera inmediata",
    "UpgradeConfirmationModal.CreditCardTab.Info": "Pagar con tarjeta de crédito/débito",
    "UpgradeConfirmationModal.PayPalTab.Info": "Pagar con PayPal",
    "UpgradeConfirmationModal.PaymentSection.Details": "Detalles del pago ",
    "UpgradeConfirmationModal.CheckoutButton.FreeTrial": "Reclamar mi periodo de prueba gratis",
    "UpgradeConfirmationModal.CheckoutButton.Upgrade": "Pasar a ",
    "UpgradeConfirmationModal.FooterTestA.Info1.Top": "Más de 50 000 empresarios la eligieron",
    "UpgradeConfirmationModal.FooterTestA.Info1.Bottom":
      "Nuestros clientes nos han calificado sistemáticamente con un 5/5.",
    "UpgradeConfirmationModal.FooterTestA.Info2.Top": "Cifrado SSL de 128 bits",
    "UpgradeConfirmationModal.FooterTestA.Info2.Bottom":
      "Todos los datos de tus pagos están 100 % seguros con nosotros.",
    "UpgradeConfirmationModal.FooterTestB.Avatars": "Más de 50 000",
    "UpgradeConfirmationModal.FooterTestB.Info1.Top": "Más de 50 000 empresarios la eligieron",
    "UpgradeConfirmationModal.FooterTestB.Info1.Bottom":
      "Nuestros clientes nos han calificado sistemáticamente con un 5/5.",
    "UpgradeConfirmationModal.FooterTestB.Info2.Top": "Cifrado SSL de 128 bits",
    "UpgradeConfirmationModal.FooterTestB.Info2.Bottom":
      "Todos los datos de tus pagos están 100 % seguros con nosotros.",
    "UpgradeConfirmationModal.Agreement.Intro": "Si decides seguir, aceptas lo siguiente: ",
    "UpgradeConfirmationModal.Agreement.Terms": "Términos de uso",
    "UpgradeConfirmationModal.Agreement.Privacy": "Política de privacidad",
    "UpgradeConfirmationModal.Agreement.Refund": "Política de reembolso",
    "UpgradeConfirmationModal.Agreement.Middle": "y",
    "UpgradeConfirmationModal.Agreement.Cancelation": "Política de cancelación",

    "OrderDetails.Title": "Información del pedido",

    "CreditCard.Update.Label": "Tarjeta de crédito",
    "CreditCard.Update.InputValue": "Tarjeta de crédito que finaliza en",
    "CreditCard.Update.Button": "Actualizar tarjeta",
    "CreditCard.AddCreditCard.Text":
      "Todavía no has agregado una tarjeta de crédito. Agrega una de las tarjetas de crédito que aparecen a continuación para que podamos procesar tus pedidos de manera automática",
    "CreditCard.AddCreditCardSubscription.Text": "You have not added any credit card yet. Please add a credit card below to allow us to process your membership automatically", // ENGLISH
    "CreditCard.AddCreditCard.Button": "Agregar tarjeta de crédito",

    "Sidebar.SearchProducts": "Buscar productos",
    "Sidebar.WinningProducts": "Productos ganadores",
    "Sidebar.WinningProducts.Variant": "Nuevo",
    "Sidebar.ImportList": "Lista de importación",
    "Sidebar.MyProducts": "Mis productos",
    "Sidebar.MyOrders": "Mis pedidos",
    "Sidebar.Apps": "Apps",
    "Sidebar.HelpCenter": "Centro de ayuda",
    "Sidebar.MyShop": "Mi tienda",
    "Sidebar.Settings": "Ajustes",

    "TutorialModal.Title": "Estamos aquí para ayudarte",
    "TutorialModal.WhatIsSpocket": "¿Qué es Spocket?",
    "TutorialModal.DiscoverProducts": "Descubre productos",
    "TutorialModal.ProductCustomization": "Personalización de productos",
    "TutorialModal.OrderProcessing": "Procesamiento del pedido",
    "TutorialModal.Settings": "Ajustes",
    "TutorialModal.GetHelp": "Obtener ayuda",
    "TutorialModal.JoinTheCommunity": "Únete a la comunidad",

    "NotificationCenter.Header": "Centro de notificaciones",
    "NotificationCenter.Footer": "Ver todas las notificaciones",
    "NotificationCenter.NoNotification": "¡Nada para ver aquí!",

    "Products.Title.Head": "Mis productos - Spocket",
    "Products.Title.Header": "Mis productos",
    "Products.Loading.Top": "¡Se está cargando la lista de tus productos!",
    "Products.Loading.Bottom": "Te pedimos que esperes mientras buscamos tus productos.",
    "Products.Empty.Search": "¡No encontramos ningún producto!",
    "Products.Empty.Top": "¡La lista de productos está vacía!",
    "Products.Empty.Bottom":
      "Visita la página de búsqueda para comenzar a agregar productos a tu lista de importación.",
    "Products.Empty.Button.Search": "Buscar productos",
    "Products.Empty.Button.How": "Cómo encontrar productos",
    "Products.Alert.Removed": "Producto eliminado",

    "Products.Search.Label": "Buscar tus productos",
    "Products.Search.Placeholder": "Palabra clave",
    "Products.Search.Button": "Buscar",

    "ProductListItem.Inactive.Tooltip": "Este producto ya no está disponible en el proveedor",
    "ProductListItem.Inactive.Title": "Inactivo",
    "ProductListItem.OutOfStock.Tooltip": "Todas las variantes de este producto están agotadas",
    "ProductListItem.OutOfStock.Title": "Agotado",
    "ProductListItem.InventoryCount.Singular": "unidad",
    "ProductListItem.InventoryCount.Plural": "unidades",
    "ProductListItem.InventoryCount.End.Singular": "queda",
    "ProductListItem.InventoryCount.End.Plural": "quedan",
    "ProductListItem.Button.View": "Ver en la tienda",
    "ProductListItem.Button.Remove": "Eliminar de la tienda",
    "ProductListItem.ItemVariant.LowStock.Label": "Low Stock", // ENGLISH

    "ImportList.Title.Head": "Lista de importación - Spocket",
    "ImportList.Title.Header": "Mi lista de importación",
    "ImportList.Loading.Top": "¡Tu lista de importación se está cargando!",
    "ImportList.Loading.Bottom": "Te pedimos que esperes mientras buscamos tus productos.",
    "ImportList.Empty.Button.Search": "Buscar productos",
    "ImportList.Empty.Top": "¡Tu lista de importación está vacía!",
    "ImportList.Empty.Bottom":
      "Visita la página de búsqueda para comenzar a agregar productos a tu lista de importación.",
    "ImportList.Empty.Button.How": "Cómo personalizar productos",
    "ImportList.Alert.Pushed": "Este producto se está promocionando en tu tienda:",
    "ImportList.LowStockVariants.Label": "Low stock variants", // ENGLISH

    "ImportList.Search.Label": "Busca entre tus productos importados",
    "ImportList.Search.Placeholder": "Buscar tus productos",
    "ImportList.Search.Button": "Buscar",

    "PushAllModal.Button.Active": "Promocionando los productos de la página actual",
    "PushAllModal.Button.Inactive": "Promocionar página actual",
    "PushAllModal.Modal.Text":
      "¿Seguro que quieres promocionar todos los productos de esta página? Todos los productos válidos en la página actual se promocionarán en tu tienda.",
    "PushAllModal.Modal.Push": "Promocionar todo",
    "PushAllModal.Modal.Cancel": "Cancelar",

    "RemoveAllModal.Button.Active": "Eliminando los productos de la página actual",
    "RemoveAllModal.Button.Inactive": "Eliminar la página actual",
    "RemoveAllModal.Modal.Text":
      "¿Seguro que quieres eliminar todos los productos de esta página? Todos los productos en la página actual quedarán eliminados de la lista de importación.",
    "RemoveAllModal.Modal.Remove": "Eliminar todo",
    "RemoveAllModal.Modal.Cancel": "Cancelar",

    "ImportListItem.Tab.Product": "Producto",
    "ImportListItem.Tab.Description": "Descripción",
    "ImportListItem.Tab.Variants": "Variantes",
    "ImportListItem.Tab.Images": "Imágenes",
    "ImportListItem.Remove.Active": "Eliminando producto",
    "ImportListItem.Remove.Inactive": "Eliminar producto",
    "ImportListItem.Push.Active": "Promocionando en la tienda",
    "ImportListItem.Push.Inactive": "Promocionar en la tienda",
    "ImportListItem.Save.Button": "Guardar",
    "ImportListItem.Alert.Removed": "Se eliminó este producto de tu lista de importación: ",
    "ImportListItem.Alert.RemoveFailed": "Hubo un error al intentar eliminar: ",
    "ImportListItem.Alert.CompareAtPrice":
      "Comparable en precio debería ser mayor que el precio de venta para: ",
    "ImportListItem.Alert.OneActiveVariation": "Este producto necesita al menos una variante activa: ",
    "ImportListItem.Alert.Saved": "Se guardó este producto: ",
    "ImportListItem.Alert.ErrorPushing": "Hubo un error al promocionar en tu tienda",
    "ImportListItem.Alert.ErrorSaving": "Hubo un error al guardar tu tienda",
    "ImportListItem.Modal.ConnectStore": "Conecta tu tienda para promocionar productos: ",
    "ImportListItem.Tooltip.OneActiveVariation": "Necesitas al menos una variante activa",
    "ImportListItem.Tooltip.Unavailable": "Este producto no se puede comprar en este momento",
    "ImportListItem.Tooltip.Unsaved": "Tienes cambios sin guardar",
    "ImportListItem.Tooltip.Profit": "Advertencia: Tu ganancia bruta es negativa para este producto",
    "ImportListItem.Tooltip.Unpurchasable":
      "Puedes guardar este producto, pero en este momento no puedes comprarlo",
    "ImportListItem.Variants.ShowShippingPrices": "Mostrar precios de envío",

    "ItemInfo.ProductName.Label": "Nombre del producto",
    "ItemInfo.ProductTags.Label": "Etiquetas del producto",
    "ItemInfo.ProductTags.Remove": "Eliminar todas las etiquetas",
    "ItemInfo.ProductTags.Placeholder": "Agregar etiqueta nueva",
    "ItemInfo.ProductType.Label": "Tipo de producto",
    "ItemInfo.Collection.Label": "Colección",
    "ItemInfo.Collection.Placeholder": "Seleccionar",
    "ItemInfo.Collection.Option": "Seleccionar",

    "ItemVariantList.Modal.Title": "Información del envío",
    "ItemVariantList.Modal.Intro": "Se envía desde: ",
    "ItemVariantList.Modal.DoesNotShipInternational": "Este artículo no tiene envío internacional.",
    "ItemVariantList.Modal.DoesNotShipTo": "No se puede enviar a: ",
    "ItemVariantList.Table.Head.Destination": "Destino",
    "ItemVariantList.Table.Head.Cost": "Coste",
    "ItemVariantList.Table.Head.Time": "Tiempo de entrega (días)",
    "ItemVariantList.Table.Body.Domestic": "Nacional",
    "ItemVariantList.Table.Body.International": "Internacional",
    "ItemVariantList.VariantsTable.ShippingPrice": "Precio de envío ",
    "ItemVariantList.VariantsTable.Image": "Imagen",
    "ItemVariantList.VariantsTable.SKU": "Código de referencia",
    "ItemVariantList.VariantsTable.Inventory": "Inventario",
    "ItemVariantList.VariantsTable.Price": "Precio",
    "ItemVariantList.VariantsTable.SalesPrice": "Precio de venta ",
    "ItemVariantList.VariantsTable.Profit": "Ganancia",
    "ItemVariantList.VariantsTable.CompareAtPrice": "Comparable en precio",
    "ItemVariantList.VariantsTable.Unavailable": "Este producto no se puede comprar en este momento",
    "ItemVariantList.VariantsTable.Head": "Todas las variantes de este producto se muestran aquí.",
    "ItemVariantList.VariantsTable.ContextPopover.Placeholder": "ejemplo: 40 %",
    "ItemVariantList.Alert.MaxVariants": "Shopify no acepta más de 100 variantes.",

    "ItemVariantList.ContextPopover.Title": "Establecer ganancia",
    "ItemVariantList.ContextPopover.Apply": "Aplicar",

    "ProductVariation.Description":
      "Puedes realizar un pedido para obtener productos de muestra directamente en Spocket. Sigue los siguientes pasos para una finalización del pedido fácil y rápida.",
    "ProductVariation.Label.SelectVariant": "Seleccionar variante",
    "ProductVariation.Label.SelectTheProductVariation": "Seleccionar la variante del producto",
    "ProductVariation.Qty": "Cant.",
    "ProductVariation.Label.NotesForTheSupplier": "Notas para el proveedor",

    "InputAddress.Label.FirstName": "Nombre",
    "InputAddress.PlaceHolder.FirstName": "Introducir nombre",
    "InputAddress.Label.LastName": "Apellido",
    "InputAddress.PlaceHolder.LastName": "Introducir apellido",
    "InputAddress.Label.StreetAddress": "Dirección",
    "InputAddress.Label.Country": "País",
    "InputAddress.PlaceHolder.Country": "Buscar país",
    "InputAddress.Label.State": "Estado",
    "InputAddress.Placeholder.State": "Buscar estado",
    "InputAddress.Label.City": "Ciudad",
    "InputAddress.PlaceHolder.City": "Introducir ciudad",
    "InputAddress.Label.Zip": "Código postal",
    "InputAddress.PlaceHolder.Zip": "Introducir código postal",
    "InputAddress.Label.Phone": "Número de teléfono",
    "InputAddress.Placeholder.Phone": "Introducir número de teléfono",

    "OrderReview.OrderDetails": "Información del pedido",
    "OrderReview.Unit": "{{count}} unidad",
    "OrderReview.Unit_plural": "{{count}} unidades",
    "OrderReview.ShippingAddress": "Dirección de envío",
    "OrderReview.PaymentMethod": "Método de pago",
    "OrderReview.Amounts": "Cantidades",
    "OrderReview.Subtotal": "Subtotal",
    "OrderReview.ShippingCost": "Coste del envío",
    "OrderReview.TransactionFees": "Costes de la transacción",
    "OrderReview.TransactionFees.ToolTips":
      "Los costes de la transacción incluyen las tarifas que cobran Stripe, el proveedor de pagos de Spocket, así como también las tarifas por servicio.",
    "OrderReview.OrderTotal": "Total del pedido",
    "OrderReview.ItemWithCount": "{{count}} artículo",
    "OrderReview.ItemWithCount_plural": "{{count}} artículos",
    "OrderReview.Placeholder.CreditCard": "Tarjeta de crédito que finaliza en {{last4}}",

    "PaymentComplete.PaymentCompleted": "Pago completado",
    "PaymentComplete.PaymentCompleted.Note":
      "Gracias por el pago. Hemos notificado al proveedor y tu pedido se procesará a la brevedad. Actualizaremos el estado del pedido y agregaremos el número de seguimiento en la página de tus pedidos.",
    "PaymentComplete.PaymentIncomplete": "¡Tu pedido está incompleto!",
    "PaymentComplete.PaymentIncomplete.BankRequiresConfirmation.Note":
      "Tu banco requiere que confirmes tu pago para proceder",
    "PaymentComplete.PaymentIncomplete.ConfirmationLink": "Usa este enlace para confirmar el pago.",
    "PaymentComplete.PaymentIncomplete.Note":
      "Una vez que el pago esté confirmado, se notificará al proveedor y procesaremos tu pedido como lo hacemos habitualmente. Las noticias sobre el estado y el seguimiento se agregarán a la página de tus pedidos. Vuelve a cargar la página después de la confirmación.",

    "CreditCard.AddCreditCard.Description":
      "Todavía no has agregado una tarjeta de crédito. Agrega una de las tarjetas de crédito que aparecen a continuación para que podamos procesar tus pedidos de manera automática",
    "CreditCard.Button.AddCreditCard": "Agregar tarjeta de crédito",
    "CreditCard.Button.UpdateCard": "Actualizar tarjeta",
    "CreditCard.UpdateCard.Label.CreditCard": "Tarjeta de crédito",
    "CreditCard.PlaceHolder.CreditCard": "Tarjeta de crédito que finaliza en {{last4}}",

    "UpdateCreditCardModal.Label.CreditCard": "Tarjeta de crédito",
    "UpdateCreditCardModal.Button.UpdateCard": "Actualizar tarjeta",
    "UpdateCreditCardModal.Button.AddCreditCard": "Agregar tarjeta de crédito",
    "UpdateCreditCardModal.Button.Cancel": "Cancelar",
    "UpdateCreditCardModal.Label.UpdateCardDetails": "Actualiza la información de tu tarjeta",
    "UpdateCreditCardModal.Label.TermsAndConditionsNote.One":
      "Usaremos tu cuenta durante el procesamiento del pedido de tus productos en Spocket.",
    "UpdateCreditCardModal.Label.TermsAndConditionsNote.Two": "Términos y condiciones",
    "UpdateCreditCardModal.Label.TermsAndConditionsNote.Three": "para el procesamiento de pagos.",

    "SampleOrderModal.Title.SelectVariation": "Seleccionar variante",
    "SampleOrderModal.Title.ShippingAddress": "Dirección de envío",
    "SampleOrderModal.Title.PaymentMethod": "Método de pago",
    "SampleOrderModal.Title.Review": "Revisar",
    "SampleOrderModal.Title.PaymentConfirmationRequired": "¡Debes confirmar el pago!",
    "SampleOrderModal.Title.OrderPlaced": "¡Pedido realizado!",
    "SampleOrderModal.Steps": "Paso {{current}} de {{total}}",
    "SampleOrderModal.FinalStep": "Paso final",
    "SampleOrderModal.ConfirmPayment": "¡Confirma el pago!",
    "SampleOrderModal.Finished": "Finalizado",
    "SampleOrderModal.Footer.Continue": "Continuar",
    "SampleOrderModal.Footer.PlaceOrder": "Realizar pedido",
    "SampleOrderModal.Footer.Close": "Cerrar",
    "SampleOrderModal.Footer.Cancel": "Cancelar",
    "SampleOrderModal.Footer.GoBack": "Volver",

    "RatingCaptureModal.EnjoyingSpocket": "¿Te gusta Spocket?",
    "RatingCaptureModal.TapAStar": "Toca una estrella para calificarla en la App Store",

    "AdvancedFiltersModal.Title.Filters": "Filtros",
    "AdvancedFiltersModal.Title.Shipping": "Envío",
    "AdvancedFiltersModal.Label.ShipsFrom": "Se envía desde",
    "AdvancedFiltersModal.Label.ShipsTo": "Se envía a",
    "AdvancedFiltersModal.Label.ShippingTime": "Tiempo de envío",
    "AdvancedFiltersModal.Label.Popular": "Popular",
    "AdvancedFiltersModal.Label.Country.UnitedStates": "Estados Unidos",
    "AdvancedFiltersModal.Label.Country.Europe": "Europa",
    "AdvancedFiltersModal.Label.ShippingTimeDescription": "Solo se puede enviar a los Estados Unidos",
    "AdvancedFiltersModal.RadioOption.ShippingTime.Any": "Cualquier número de días",
    "AdvancedFiltersModal.RadioOption.ShippingTime.One": "1-3 días",
    "AdvancedFiltersModal.RadioOption.ShippingTime.Four": "4-7 días",
    "AdvancedFiltersModal.RadioOption.ShippingTime.Eight": "8-14 días",
    "AdvancedFiltersModal.RadioOption.ShippingTime.Fifteen": "Más de 15 días",
    "AdvancedFiltersModal.Title.ItemsCost": "Coste de los artículos",
    "AdvancedFiltersModal.Label.ItemCost": "Coste del artículo",
    "AdvancedFiltersModal.Label.ShippingCost": "Coste del envío",
    "AdvancedFiltersModal.RadioOption.ShippingCost.Any": "Cualquier coste",
    "AdvancedFiltersModal.RadioOption.ShippingCost.Free": "Gratis",
    "AdvancedFiltersModal.RadioOption.ShippingCost.Five": "5 $ o menos",
    "AdvancedFiltersModal.RadioOption.ShippingCost.Fifteen": "15 $ o menos",
    "AdvancedFiltersModal.RadioOption.ShippingCost.TwentyFive": "25 $ o menos",
    "AdvancedFiltersModal.Title.Supplier": "Proveedor",
    "AdvancedFiltersModal.Select.MenuTitle.Suppliers": "Proveedores",
    "AdvancedFiltersModal.Label.TopSupplier": "Proveedor principal",
    "AdvancedFiltersModal.Label.TopSupplierDescription":
      "Proveedores conocidos por la alta calidad de sus productos, su gran servicio y sus buenas calificaciones",
    "AdvancedFiltersModal.Title.Advanced": "Avanzado",
    "AdvancedFiltersModal.Checkbox.Label.PremiumProducts": "Productos prémium",
    "AdvancedFiltersModal.Checkbox.Label.PremiumProductsDescription":
      "Productos con grandes descuentos y envío rápido",
    "AdvancedFiltersModal.Checkbox.Label.BestSeller": "Más vendido",
    "AdvancedFiltersModal.Checkbox.Label.BestSellerDescription": "Productos con mejor desempeño en Spocket",
    "AdvancedFiltersModal.Button.Cancel": "Cancelar",
    "AdvancedFiltersModal.Button.ViewResults": "Ver resultados",
    "AdvancedFiltersModal.Select.PlaceHolder.Countries": "Buscar país...",
    "AdvancedFiltersModal.Select.MenuTitle.Countries": "Países",
    "AdvancedFiltersModal.Select.PlaceHolder.Suppliers": "Buscar proveedor...",
    "AdvancedFiltersModal.Label.All Suppliers": "Todos los proveedores",
    "AdvancedFiltersModal.Label.New Suppliers": "Proveedores nuevos",

    "AdvancedFilters.ShippingTime.Any": "Cualquier número de días",
    "AdvancedFilters.ShippingTime.One": "1-3 días",
    "AdvancedFilters.ShippingTime.Four": "4-7 días",
    "AdvancedFilters.ShippingTime.Eight": "8-14 días",
    "AdvancedFilters.ShippingTime.Fifteen": "Más de 15 días",

    "AdvancedFilters.ShippingCost.Free": "Envío gratis",
    "AdvancedFilters.ShippingCost.Five": "Envío de menos de 5 $",
    "AdvancedFilters.ShippingCost.Fifteen": "Envío de menos de 15 $",
    "AdvancedFilters.ShippingCost.TwentyFive": "Envío de menos de 25 $",

    "AdvancedFilters.transpileFiltersKey.Label.ClearAll": "Borrar todo",
    "AdvancedFilters.transpileFiltersKey.Label.Shipping": "Envío",
    "AdvancedFilters.transpileFiltersKey.Label.Keywords": "Buscar",
    "AdvancedFilters.transpileFiltersKey.Label.ShipsFrom": "Se envía desde",
    "AdvancedFilters.transpileFiltersKey.Label.ShipsTo": "Se envía a",
    "AdvancedFilters.transpileFiltersKey.Label.Supplier": "Proveedor",
    "AdvancedFilters.transpileFiltersKey.Label.SortBy": "Ordenar por",
    "AdvancedFilters.transpileFiltersKey.Label.ItemCost": "Coste del artículo",
    "AdvancedFilters.transpileFiltersKey.Value.TopSuppliers": "Proveedores principales",
    "AdvancedFilters.transpileFiltersKey.Value.PersonalizedInvoices": "Facturas personalizadas",
    "AdvancedFilters.transpileFiltersKey.Value.BestSeller": "Más vendido",
    "AdvancedFilters.transpileFiltersKey.Value.Premium": "Prémium",
    "AdvancedFilters.transpileFiltersKey.Value.ItemCost.FromTo": "de {{from}} a {{to}}",
    "AdvancedFilters.transpileFiltersKey.Label.Inventory": "Inventory", // * ENGLISH

    "Search.Header.PlaceHolder.Search": "Introducir palabras clave...",
    "Search.Header.Button.Search": "Buscar",
    "Search.Header.Button.Filters": "Filtros",

    "Navigation.UpgradeButton.TryPro": "Prueba Spocket Pro GRATIS",
    "Navigation.UpgradeButton.TryEmpire": "Prueba Spocket EMPIRE GRATIS",
    "Navigation.UpgradeButton.TryUnicorn": "Prueba Spocket Unicorn GRATIS",

    "CategoriesCards.Label.MoreCategories": "Más categorías",

    "StaticCategories.WomensClothing": "Indumentaria femenina",
    "StaticCategories.WomensClothing.Activewear": "Indumentaria deportiva",
    "StaticCategories.WomensClothing.Bodysuits": "Bodies",
    "StaticCategories.WomensClothing.Dresses": "Vestidos",
    "StaticCategories.WomensClothing.JacketsCoats": "Chaquetas y abrigos",
    "StaticCategories.WomensClothing.Jeans": "Vaqueros",
    "StaticCategories.WomensClothing.JumpsuitsRompers": "Monos",
    "StaticCategories.WomensClothing.Leggings": "Leggings",
    "StaticCategories.WomensClothing.LingerieUnderwear": "Lencería y ropa interior",
    "StaticCategories.WomensClothing.MatchingSets": "Conjuntos",
    "StaticCategories.WomensClothing.Pants": "Pantalones",
    "StaticCategories.WomensClothing.Shorts": "Shorts",
    "StaticCategories.WomensClothing.Skirts": "Faldas",
    "StaticCategories.WomensClothing.Sleepwear": "Ropa de dormir",
    "StaticCategories.WomensClothing.Socks": "Calcetines",
    "StaticCategories.WomensClothing.SweatersHoodies": "Suéteres y sudaderas",
    "StaticCategories.WomensClothing.Swimwear": "Trajes de baño",
    "StaticCategories.WomensClothing.TankTops": "Camisetas sin manga",
    "StaticCategories.WomensClothing.TopsBlouses": "Tops y blusas",
    "StaticCategories.WomensClothing.Tshirts": "Camisetas",

    "StaticCategories.JewelryWatches": "Joyas y relojes",
    "StaticCategories.JewelryWatches.Bracelets": "Brazaletes",
    "StaticCategories.JewelryWatches.Earrings": "Pendientes",
    "StaticCategories.JewelryWatches.Necklaces": "Collares",
    "StaticCategories.JewelryWatches.OtherAccessories": "Otros accesorios",
    "StaticCategories.JewelryWatches.PendantsStonesCharms": "Colgantes, piedras y dijes",
    "StaticCategories.JewelryWatches.Rings": "Anillos",
    "StaticCategories.JewelryWatches.Sets": "Conjuntos",
    "StaticCategories.JewelryWatches.Watches": "Relojes",

    "StaticCategories.TechAccessories": "Accesorios tecnológicos",
    "StaticCategories.TechAccessories.AudioVideo": "Audio y vídeo",
    "StaticCategories.TechAccessories.CasesCovers": "Estuches y fundas",
    "StaticCategories.TechAccessories.Lighting": "Iluminación",
    "StaticCategories.TechAccessories.MobileLaptopAccessories":
      "Accesorios para teléfonos móviles y portátiles",
    "StaticCategories.TechAccessories.Mousepads": "Alfombrillas de ratón",
    "StaticCategories.TechAccessories.Novelty": "Novedades",

    "StaticCategories.KidsBabies": "Niños y bebés",
    "StaticCategories.KidsBabies.BabyClothing": "Ropa de bebé",
    "StaticCategories.KidsBabies.Bathing": "Baño",
    "StaticCategories.KidsBabies.BlanketsPillows": "Sábanas y almohadas",
    "StaticCategories.KidsBabies.CapsHeadbands": "Gorras y cintas para el cabello",
    "StaticCategories.KidsBabies.Footwear": "Calzado",
    "StaticCategories.KidsBabies.Furniture": "Muebles",
    "StaticCategories.KidsBabies.KidsClothing": "Indumentaria infantil",
    "StaticCategories.KidsBabies.ParenthoodAccessories": "Crianza y accesorios",

    "StaticCategories.Toys": "Juguetes",
    "StaticCategories.Footwear": "Calzado",
    "StaticCategories.Footwear.Boots": "Botas",
    "StaticCategories.Footwear.Flats": "Calzado plano",
    "StaticCategories.Footwear.Heels": "Tacones",
    "StaticCategories.Footwear.Mens": "Hombre",
    "StaticCategories.Footwear.Sandals": "Sandalias",
    "StaticCategories.Footwear.Slippers": "Pantuflas",
    "StaticCategories.Footwear.SneakersRunners": "Zapatillas",

    "StaticCategories.BathBeauty": "Baño y belleza",
    "StaticCategories.BathBeauty.Bodycare": "Cuidado corporal",
    "StaticCategories.BathBeauty.DiffusersOilsCandles": "Difusores, aceites y velas",
    "StaticCategories.BathBeauty.Haircare": "Cuidado capilar",
    "StaticCategories.BathBeauty.Healthcare": "Cuidado de la salud",
    "StaticCategories.BathBeauty.Makeup": "Maquillaje",
    "StaticCategories.BathBeauty.Nails": "Uñas",
    "StaticCategories.BathBeauty.Skincare": "Cuidado de la piel",
    "StaticCategories.BathBeauty.TowelsRobes": "Toallas y batas",

    "StaticCategories.Pets": "Mascotas",
    "StaticCategories.Pets.BedsBlankets": "Camas y ropa de cama",
    "StaticCategories.Pets.LeashesCollarsPetwear": "Correas, collarines y accesorios para mascotas",
    "StaticCategories.Pets.Petcare": "Cuidado de mascotas",
    "StaticCategories.Pets.Toys": "Juguetes",

    "StaticCategories.HomeGarden": "Hogar y jardín",
    "StaticCategories.HomeGarden.Bathroom": "Baño",
    "StaticCategories.HomeGarden.Clocks": "Relojes",
    "StaticCategories.HomeGarden.Drinkware": "Copas y vasos",
    "StaticCategories.HomeGarden.FoodBeverage": "Alimentos y bebidas",
    "StaticCategories.HomeGarden.Furniture": "Muebles",
    "StaticCategories.HomeGarden.Garden": "Jardín",
    "StaticCategories.HomeGarden.HomeDecor": "Decoración del hogar",
    "StaticCategories.HomeGarden.HomeImprovement": "Mejoras para el hogar",
    "StaticCategories.HomeGarden.Kitchen": "Cocina",
    "StaticCategories.HomeGarden.Lighting": "Iluminación",
    "StaticCategories.HomeGarden.Organization": "Organización",
    "StaticCategories.HomeGarden.StationeryCrafts": "Papelería y manualidades",
    "StaticCategories.HomeGarden.TextilesPillows": "Artículos textiles y almohadas",
    "StaticCategories.HomeGarden.Tools": "Herramientas",

    "StaticCategories.Accessories": "Accesorios",
    "StaticCategories.Accessories.Belts": "Cinturones",
    "StaticCategories.Accessories.Cufflinks": "Gemelos",
    "StaticCategories.Accessories.Hats": "Sombreros",
    "StaticCategories.Accessories.Keychains": "Llaveros",
    "StaticCategories.Accessories.ScarvesBandanas": "Bufandas y bandanas",
    "StaticCategories.Accessories.Sunglasses": "Gafas de sol",

    "StaticCategories.MensClothing": "Indumentaria masculina",
    "StaticCategories.MensClothing.Activewear": "Indumentaria deportiva",
    "StaticCategories.MensClothing.DressShirts": "Camisas de vestir",
    "StaticCategories.MensClothing.JacketsCoats": "Chaquetas y abrigos",
    "StaticCategories.MensClothing.Pants": "Pantalones",
    "StaticCategories.MensClothing.Shorts": "Shorts",
    "StaticCategories.MensClothing.Socks": "Calcetines",
    "StaticCategories.MensClothing.SweatersHoodies": "Suéteres y sudaderas",
    "StaticCategories.MensClothing.Swimwear": "Trajes de baño",
    "StaticCategories.MensClothing.TankTops": "Camisetas sin manga",
    "StaticCategories.MensClothing.Tshirts": "Camisetas",
    "StaticCategories.MensClothing.Underwear": "Ropa interior",

    "StaticCategories.SportsOutdoors": "Deporte y vida al aire libre",
    "StaticCategories.SportsOutdoors.Activewear": "Indumentaria deportiva",
    "StaticCategories.SportsOutdoors.Biking": "Ciclismo",
    "StaticCategories.SportsOutdoors.Camping": "Camping",
    "StaticCategories.SportsOutdoors.EquipmentAccessories": "Equipos y accesorios",
    "StaticCategories.SportsOutdoors.Fishing": "Pesca",

    "StaticCategories.Gifts": "Regalos",
    "StaticCategories.Gifts.Adults": "Adultos",
    "StaticCategories.Gifts.Funny": "Divertidos",
    "StaticCategories.Gifts.Mugs": "Tazas",
    "StaticCategories.Gifts.Novelty": "Novedades",
    "StaticCategories.Gifts.Personalized": "Personalizados",
    "StaticCategories.Gifts.Religious": "Religiosos",

    "StaticCategories.Automotive": "Automotores",
    "StaticCategories.BagsWallets": "Bolsos y carteras de bolsillo",
    "StaticCategories.Seasonal": "De temporada",
    "StaticCategories.Seasonal.Christmas": "Navidad",
    "StaticCategories.Seasonal.FathersDay": "Día del padre",
    "StaticCategories.Seasonal.Halloween": "Halloween",
    "StaticCategories.Seasonal.MothersDay": "Día de la madre",

    "StaticCategories.FestivalsParties": "Festivales y fiestas",
    "StaticCategories.FestivalsParties.PartySupplies": "Suministros para fiestas",
    "StaticCategories.FestivalsParties.Wedding": "Bodas",

    "QuickFilters.Label.Premium": "Prémium",
    "QuickFilters.Label.FastUSAShipping": "Envío rápido a Estados Unidos",
    "QuickFilters.Label.Under5": "Envío a Estados Unidos de menos de 5 $",
    "QuickFilters.Label.MoreThan": "More than {{ inventoryAmount }}", // * ENGLISH
    "QuickFilters.Label.ShowAll": "Show All", // * ENGLISH
    "QuickFilters.Label.ShipsFrom": "<1/> Ship from <2/> {{ country }}", // * ENGLISH
    "QuickFilters.Label.ShipsFromAnywhere": "Anywhere", // * ENGLISH

    "SortBy.Label.SortBy": "Ordenar por",
    "SortBy.DropDown.Item.Relevance": "Relevancia",
    "SortBy.DropDown.Item.PriceLowToHigh": "Precio: menor a mayor",
    "SortBy.DropDown.Item.PriceHighToLow": "Precio: mayor a menor",
    "SortBy.DropDown.Item.Newest": "Más nuevo",
    "SortBy.DropDown.Item.ShippingTime": "Tiempo de envío",

    "Breadcrumb.Item.Home": "Inicio",
    "Breadcrumb.Item.Search": "buscar",

    "UpgradeModal.Modal.Title": "Seleccionar un plan de precios",

    "Plans.ToggleSection.Monthly": "Mensualmente",
    "Plans.ToggleSection.Yearly": "Anualmente",
    "Plans.ToggleSection.DiscountInitial": "Hasta",
    "Plans.ToggleSection.DiscountSingular": "Mes",
    "Plans.ToggleSection.DiscountPlural": "Meses",
    "Plans.ToggleSection.DiscountFinal": "de descuento",
    "Plans.ProrationCost.TextInitial": "Actualmente pagas",
    "Plans.ProrationCost.TextFinal": "por año Opta por Empire por un importe adicional de",
    "Plans.MobileWarning": "Mobile app upgrades can only be modified through the app", // English

    "Card.Title.PeriodSingular": "MES",
    "Card.Title.PeriodPlural": "MESES",
    "Card.Title.Off": "DE DESCUENTO",
    "Card.DescriptionVariantType.Starter": "Comienza a obtener ventas",
    "Card.DescriptionVariantType.Professional": "Aumenta las ventas",
    "Card.DescriptionVariantType.Empire": "Maximiza las ventas",
    "Card.DescriptionVariantType.Unicorn": "Gestiona las ventas a escala",
    "Card.DescriptionVariantType.Period": "mes",
    "Card.DescriptionVariantType.PricePeriod": "{{value}}/mes",

    "Card.DescriptionVariantType.AnnualDescription": "facturado anualmente a {{value}} $",
    "Card.DescriptionVariantType.MonthlyDescription": "después del periodo de prueba de {{value}} día",
    "Card.DescriptionVariantType.CurrentPlan": "Tu plan actual",
    "Card.DescriptionVariantType.Button.Start": "Comenzar ahora",
    "Card.DescriptionVariantType.Button.Try": "Pruébalo gratis",
    "Card.DescriptionVariantType.UniqueProducts": "productos únicos",
    "Card.DescriptionVariantType.PremiumProducts": "productos prémium",
    "Card.DescriptionVariantType.EmailSupport": "Enviar correo electrónico al servicio de asistencia",
    "Card.DescriptionVariantType.Invoicing": "Facturación con marca",
    "Card.DescriptionVariantType.InvoicingTooltip":
      "Desarrolla tu marca agregando tu propio logotipo a todos los pedidos de los proveedores que ofrecen facturación con marca",
    "Card.DescriptionVariantType.ChatSupport": "Servicio de ayuda por chat",
    "Card.DescriptionVariantType.WinningProducts": "Productos ganadores",
    "Card.DescriptionVariantType.SupplierSourcing": "Abastecimiento de proveedores",
    "Card.DescriptionVariantType.ProductRequests": "Solicitudes de producto",
    "Card.DescriptionVariantType.ProductRequestsTooltip": "Solicita productos que no estén en Spocket",
    "Card.DescriptionVariantType.BulkCheckout": "Finalización en bloque",
    "Card.DescriptionVariantType.BulkCheckoutTooltip":
      "Finaliza múltiples pedidos de una vez con solo un clic",
    "Card.DescriptionVariantType.Special": "especial",

    "ReactivationBanner.Alert": "Tu suscripción Spocket ha finalizado.",
    "ReactivationBanner.InfoSubtitle": "Reactiva tu",
    "ReactivationBanner.CheckList.HighQuality": "Alta calidad",
    "ReactivationBanner.CheckList.Curated": "Seleccionada especialmente",
    "ReactivationBanner.CheckList.FastShipping": "Envío rápido",
    "ReactivationBanner.CheckList.FromUSAndEU": "De Estados Unidos y la Unión Europea",
    "ReactivationBanner.TextByPlan.Starter.Description": "Ya no podrás <1>promocionar ningún producto</1>",
    "ReactivationBanner.TextByPlan.Starter.Title": "Cuenta Spocket",
    "ReactivationBanner.TextByPlan.Starter.Subtitle": "Comienza a promocionar productos en tu tienda ahora",
    "ReactivationBanner.TextByPlan.Others.Description.PartOne":
      "Ya no puedes <1>promocionar productos</1> en vivo ni usar ",
    "ReactivationBanner.TextByPlan.Others.Description.PartTwo": "Productos prémium",
    "ReactivationBanner.TextByPlan.Others.Title": "Cuenta prémium",
    "ReactivationBanner.TextByPlan.Others.Subtitle": "Obtén acceso a productos prémium que son",
    "ReactivationBanner.Button": "Reactivar mi cuenta AHORA",

    "AnnualPromotionModal.Header": "Felicitaciones, ahora tienes el plan {{planName}}",
    "AnnualPromotionModal.CountdownTitle": "Finaliza en",
    "AnnualPromotionModal.Button.Yes": "Pasar a anual",
    "AnnualPromotionModal.Button.No": "No, continuar con mi suscripción al plan mensual",

    "UpgradeReasonModal.Benefits.IncreasedProducts": "Más productos promocionados",
    "UpgradeReasonModal.Benefits.UnlimitedOrders": "Pedidos ilimitados",
    "UpgradeReasonModal.Benefits.BrandedInvoicing": "Facturación con marca",
    "UpgradeReasonModal.Benefits.PremiumProducts": "Productos prémium",
    "UpgradeReasonModal.Benefits.ExclusiveDeals": "Ofertas exclusivas",
    "UpgradeReasonModal.Benefits.ChatCallSupport": "Servicio de asistencia por chat y teléfono",
    "UpgradeReasonModal.Modal.Title": "¿Qué quieres lograr con Spocket?",
    "UpgradeReasonModal.Modal.Question": "¿Por qué te has pasado de plan?",
    "UpgradeReasonModal.Modal.Button": "Comienza a usar Spocket {{plan}}",
    "UpgradeReasonModal.UpgradeComment.PlaceHolder": "Nos ayuda a mejorar tu experiencia",

    "UpgradeSuccessModal.Col.One.A": "Felicitaciones.",
    "UpgradeSuccessModal.Col.One.B": "¡Ahora estás en el plan {{alias}}!",
    "UpgradeSuccessModal.Col.Two.A":
      "Has desbloqueado todas las herramientas que necesitas para construir un negocio de dropshipping exitoso.",
    "UpgradeSuccessModal.Col.Two.B": "Ahora puedes tener ",
    "UpgradeSuccessModal.Col.Two.C": " ¡Disfruta Spocket!",
    "UpgradeSuccessModal.Button": "Continuar",

    "Promotion.TrialDaysNormalizer.30days": "1 mes",
    "Promotion.TrialDaysNormalizer.28days": "4 semanas",
    "Promotion.TrialDaysNormalizer.21days": "3 semanas",
    "Promotion.TrialDaysNormalizer.14days": "2 semanas",
    "Promotion.TrialDaysNormalizer.7days": "1 semana",
    "Promotion.TrialDaysNormalizer.1day": "1 día",
    "Promotion.TrialDaysNormalizer.Days": "{{value}} días",
    "Promotion.TrialDaysPlan.Title": "Prueba Spocket Pro ahora y obtén 2 semanas gratis",
    "Promotion.TrialDaysPlan.Text": "Prueba Spocket Pro ahora y obtén {{value}} gratis",
    "Promotion.Button": "Pruébala gratis",
    "StickyPromotion.Text": "Prueba Spocket Pro gratis durante",
    "StickyPromotion.Button": "Probar ahora →",
    "Onboarding.Steps.Title": "¡Aumenta las ventas en tu tienda!",
    "Onboarding.Steps.Subtitle":
      "Consejo de Spocket: una tienda típica promociona 25 productos antes de obtener ventas",
    "Steps.ChecklistItem.Connect.Text": "Conecta tu cuenta",
    "Steps.ChecklistItem.Connect.Tooltip": "Conecta tu cuenta a tu tienda de Shopify o WooCommerce",
    "Steps.ChecklistItem.Connect.Disabled": "",
    "Steps.ChecklistItem.Search.Text": "Busca productos y agrégalos a la lista de importación",
    "Steps.ChecklistItem.Search.Tooltip":
      "Encuentra productos fantásticos de proveedores de Estados Unidos y la Unión Europea y agrégalos a tu lista de importación.",
    "Steps.ChecklistItem.Search.Disabled": "",
    "Steps.ChecklistItem.Push.Text": "Promociona productos en tu tienda",
    "Steps.ChecklistItem.Push.Tooltip":
      "Personaliza productos en tu lista de importación y promociónalos en tu tienda con un clic.",
    "Steps.ChecklistItem.Push.Disabled": "",
    "Steps.ChecklistItem.Review.Text": "¡Deja tus comentarios a Spocket!",
    "Steps.ChecklistItem.Review.Tooltip":
      "¿Disfrutas tu experiencia hasta el momento? ¡Compártela con otras personas!",
    "Steps.ChecklistItem.Review.Disabled": "Conectar cuenta",

    "BubbleWidget.Head.Title": "Hola",
    "BubbleWidget.Head.Subtitle": "Te damos la bienvenida al Servicio de asistencia de Spocket",
    "BubbleWidget.HelpCenter.Title": "Centro de ayuda",
    "BubbleWidget.HelpCenter.Subtitle": "Consejos y respuestas del equipo de Spocket",
    "BubbleWidget.EmailUs.Title": "Envíanos un correo electrónico",
    "BubbleWidget.EmailUs.Subtitle": "Contáctanos para obtener respuestas a tus preguntas",
    "BubbleWidget.ChatWithUs.Title": "Chatea con nosotros",
    "BubbleWidget.ChatWithUs.Subtitle.Basic": "Para usuarios Pro y Empire",
    "BubbleWidget.ChatWithUs.Subtitle.NotBasic":
      "Nuestros especialistas del servicio de asistencia te están esperando",
    "BubbleWidget.ChatWithUs.Subtitle.Unlock": "Desbloquear ahora",
    "BubbleWidget.Community.Title": "Comunidad",
    "BubbleWidget.Community.Subtitle":
      "Únete a la comunidad de más de 50 000 empresas que realizan dropshipping",
    "BubbleWidget.StoreReviews.Title": "Comentarios sobre la tienda",
    "BubbleWidget.StoreReviews.Subtitle": "Usuarios Pro y Empire",
    "BubbleWidget.StoreReviews.Unlock": "Desbloquear ahora",

    "Language.Title": "Idioma",

    "WhatYouWillLoseModal.Button.Offer": "Continuar",
    "WhatYouWillLoseModal.Button.Downgrade": "Me doy por vencido, quiero bajar de categoría mi cuenta",
    "WhatYouWillLoseModal.ProductSection.Title":
      "Perderás todos los <1>{{product_count}} productos importados</1>",
    "WhatYouWillLoseModal.Product.PremiumTag": "Prémium",
    "WhatYouWillLoseModal.Product.SkeletonImage": "Más de {{product_count}}",
    "WhatYouWillLoseModal.ModalWrapper.Header": "¿ya te das por vencido?",
    "WhatYouWillLoseModal.ModalWrapper.Title.Tag": "Obtén un 50 % de descuento",
    "WhatYouWillLoseModal.ModalWrapper.Title": "Continúa tu camino empresarial durante los próximos 3 meses.",
    "WhatYouWillLoseModal.ModalWrapper.Subtitle":
      "Queremos que la tuya también sea una historia de éxito. Sabemos que llevas mucho tiempo invertido. Así que continúa. Siempre estaremos para lo que necesites. El equipo de Spocket",

    "FiftyOff3MonthsOfferSuccessModal.Header":
      "Felicitaciones, hemos agregado un descuento del 50 % a tu plan para los próximos 3 meses.",
    "FiftyOff3MonthsOfferSuccessModal.Button": "Continuar",

    "DowngradeReasonModal.DowngradeSection":
      "¿Cómo podemos hacer que Spocket se adapte mejor a tus necesidades?",
    "DowngradeReasonModal.DowngradeSection.TextArea.PlaceHolder":
      "Queremos escuchar tu opinión (100 caracteres como mínimo)",
    "DowngradeReasonModal.DowngradeSection.Tooltip": "Escribe tu comentario (100 caracteres como mínimo)",
    "DowngradeReasonModal.Button.Downgrade": "Bajar de categoría",
    "DowngradeReasonModal.ModalWrapper.Header": "¿Quieres bajar de categoría a {{storeName}}?",
    "DowngradeReasonModal.ModalWrapper.ContactUs": "Contáctanos",
    "DowngradeReasonModal.ModalWrapper.Footer.Button.Cancel": "Cancelar",

    "DowngradeSuccessModal.Header": "Ya bajamos tu categoría",
    "DowngradeSuccessModal.Body":
      "Gracias por tus comentarios. Estamos mejorando Spocket constantemente. Esperamos que pronto nos des otra oportunidad.",

    "Settings.title": "Ajustes",
    "Settings.buttonSaveChanges": "Guardar cambios",
    "Settings.buttonSaveAndPreview": "Guardar y consultar vista previa",
    "Settings.PricingPlans.Title": "Planes de precios",

    "Settings.MenuTab.Plans": "Planes",
    "Settings.MenuTab.Account": "Cuenta",
    "Settings.MenuTab.BrandedInvoicing": "Facturación con marca",
    "Settings.MenuTab.Billing": "Facturación",
    "Settings.MenuTab.GlobalPricingRules": "Reglas de precios globales",
    "Settings.MenuTab.Security": "Seguridad",

    "AccountTab.documentTitle": "Ajustes - Cuenta - Spocket",
    "AccountTab.title": "Ajustes de cuenta",
    "AccountTab.shopName": "Nombre de la tienda",
    "AccountTab.email": "Correo electrónico",
    "AccountTab.shopUrl": "URL de la tienda",
    "AccountTab.defaultCurrency": "Moneda predeterminada",
    "AccountTab.yourPlan": "Tu plan",
    "AccountTab.accountNotActive": "Tu cuenta no está activa en este momento",
    "AccountTab.alertFeatureWillBeAddedSoon":
      "¡Pronto agregaremos esta función! Por ahora, conéctate a través de la app de Shopify de Spocket.",
    "AccountTab.alertAccountSettingsUpdated": "Ajustes de cuenta actualizados",
    "AccountTab.alertInvalidShopUrl": "La URL de la tienda no es válida",
    "AccountTab.productsImported": "Productos importados",
    "AccountTab.products": "Productos",
    "AccountTab.premiumProducts": "Productos prémium",
    "AccountTab.total": "total",
    "AccountTab.signOut": "Cerrar sesión",
    "AccountTab.limitReachedProductsAndPremium": "Has llegado al límite de productos y productos prémium.",
    "AccountTab.limitReachedProducts": "Has llegado al límite de productos.",
    "AccountTab.limitReachedPremium": "Has llegado al límite de productos prémium.",
    "AccountTab.buttonSwitchToAnnualPlan": "Cambiar al plan anual",
    "AccountTab.off30Percent": "30 % de descuento",
    "AccountTab.off40Percent": "40 % de descuento",
    "AccountTab.off45Percent": "45 % de descuento",
    "AccountTab.sellMoreWithEmpirePlan": "Vende más con el plan Empire",
    "AccountTab.tooltipCurrency":
      "Tu moneda se gestiona a través de la cuenta de tu tienda. Todos los precios de tus productos importados se convertirán a esa moneda.",
    "AccountTab.shopNotConnectedYet": "No has conectado tu tienda con esta cuenta aún.",
    "AccountTab.connectYourShop": "Conecta tu tienda",

    "InvoiceTab.documentTitle": "Ajustes - Facturación - Spocket",
    "InvoiceTab.alertInvoiceSettingSaved": "¡Se han guardado los ajustes de tu factura!",
    "InvoiceTab.shopLogo": "Logotipo de la tienda",
    "InvoiceTab.contactEmail": "Correo electrónico de contacto",
    "InvoiceTab.phoneNumber": "Número de teléfono",
    "InvoiceTab.personalNote": "Nota personal",
    "InvoiceTab.tooltipPersonalNote":
      "Escribe una nota personal que se incluirá en cada una de tus facturas con marca",
    "InvoiceTab.brandedInvoicing": "Facturación con marca",
    "InvoiceTab.tooltipBrandedInvoicing":
      "Con el plan de pago, puedes agregar el logotipo de tus marcas y una nota personal a todos los pedidos de los proveedores que ofrecen facturación con marca",
    "InvoiceTab.disabledInvoicing": "Incluye la facturación con marca en todos los pedidos",
    "InvoiceTab.tooltipDisabledInvoicing":
      "Al desactivar esta opción, la facturación con marca quedará excluida cuando realices tus pedidos",

    "PricingTab.titleDefaultPricingRules": "Reglas de precios predeterminadas",
    "PricingTab.tooltipTitleDefaultPricingRules":
      "Desde aquí puedes asignar el margen fijo de ganancia o multiplicador que se aplicará a todos tus productos",
    "PricingTab.titleAdvancedPricingRules": "Reglas avanzadas de precios",
    "PricingTab.tooltipTitleAdvancedPricingRules":
      "Las reglas avanzadas te permiten establecer tu margen de ganancia o los multiplicadores según el rango de precio del producto.",
    "PricingTab.assignCents": "Asignar céntimos",
    "PricingTab.tooltipAssignCents":
      "Este valor se usará al mostrar el precio final de tus artículos (por ejemplo: si quieres que el coste de tu producto sea XX,99, entonces agrega 99 en los campos que aparecen más abajo).",
    "PricingTab.Markup": "Margen de ganancia",
    "PricingTab.MarkupType": "Tipo de margen de ganancia",
    "PricingTab.SelectDefault": "-- Seleccionar uno --",
    "PricingTab.SelectPercent": "Porcentaje",
    "PricingTab.SelectMultiplier": "Multiplicador",
    "PricingTab.SelectFixed": "Fijo",
    "PricingTab.titlePricingRules": "Ajustes - Reglas de precio - Spocket",
    "PricingTab.toggleAdvancedPricingRules": "Activar o desactivar las reglas avanzadas de precios",
    "PricingTab.from": "Desde",
    "PricingTab.to": "Hasta",
    "PricingTab.selectFixedAmount": "Importe fijo",
    "PricingTab.buttonRemove": "Eliminar",
    "PricingTab.alertCannotCreateMoreThanOneRuleWithEmptyFields":
      "No puedes crear más de una regla con campos vacíos",
    "PricingTab.costRange": "Rango de coste",
    "PricingTab.markup": "Margen de ganancia",
    "PricingTab.add": "Agregar",

    "SecurityTab.Document.Title": "Ajustes - Seguridad - Spocket",
    "SecurityTab.alertIncorrectPassword": "Contraseña incorrecta",
    "SecurityTab.title": "Seguridad",
    "SecurityTab.yourNewPassword": "Tu nueva contraseña",
    "SecurityTab.repeatPassword": "Repetir contraseña",
    "SecurityTab.errorPleaseEnterAPassword": "Introduce una contraseña.",
    "SecurityTab.errorPasswordsConfirmationNeeded": "Introduce la confirmación de la contraseña.",
    "SecurityTab.errorPasswordsDoNotMatch": "Las contraseñas no coinciden",
    "SecurityTab.errorPasswordShort": "La contraseña debe tener 8 caracteres o más",

    "ListingCards.TopSupplierTag.Tooltip":
      "Los proveedores principales son conocidos por la alta calidad de sus productos, su gran servicio y sus buenas calificaciones",
    "ListingCards.TopSupplierTag.Text": "Proveedor",

    "ListingCard.OriginCountry.Intro": "Por",
    "ListingCard.OriginCountry.Tooltip": "Se envía desde",
    "ListingCard.Shipping.Price.Title": "Precio de envío",
    "ListingCard.Shipping.Price.Free": "GRATIS",
    "ListingCard.Price.Intro": "Coste de lista",
    "ListingCard.Price.Retail": "Precio de venta",
    "ListingCard.Shipping.Time.Title": "Tiempo de envío",
    "ListingCard.Shipping.Time.Period": "días",
    "ListingCard.PremiumIcon.Tooltip":
      "Vende en tu tienda productos exclusivos, con grandes descuentos y envío rápido",
    "ListingCard.PremiumIcon.Text": "Prémium",
    "ListingCard.ListButton.Import": "Agregar a la lista de importación",
    "ListingCard.ListButton.Remove": "Eliminar de la lista de importación",
    "ListingCard.ListButton.Pushed": "Promocionado en la tienda",
    "ListingCard.StatusTag.Imported.Title": "Importado",
    "ListingCard.StatusTag.Imported.Text": "Este artículo ya está en tu lista de importación",
    "ListingCard.StatusTag.Pushed.Title": "En la tienda",
    "ListingCard.StatusTag.Pusehd.Text": "Este artículo se está promocionando en tu tienda",

    "ListingModal.MainSection.Title": "Descripción del producto",
    "ListingModal.DetailsSection.Button.ProductVariations": "Abrir variantes del producto",
    "ListingModal.DetailsSection.Button.OrderSamples": "Solicitar muestras",
    "ListingModal.DetailsSection.Button.OrderSamples.New": "Nuevo",
    "ListingModal.DetailsSection.BrandedInvoicing.Alert":
      "La facturación con marca no está disponible para este producto",
    "ListingModal.DetailsSection.InternationalShipping.Alert":
      "Los pedidos internacionales se enviarán desde nuestro almacén en China",
    "ListingModal.DetailsSection.StockUsa.Alert":
      "Los artículos que estén agotados en el almacén de los Estados Unidos, probablemente, se envíen desde nuestro almacén en China",
    "ListingModal.DetailsSection.MultiplePackage.Alert":
      "Es posible que se envíen los pedidos en varios paquetes para reducir el tiempo de entrega general de tus pedidos",
    "ListingModal.DetailsSection.ConnectStore.Alert": "Conecta tu tienda para realizar un pedido",
    "ListingModal.DetailsSection.PushedListButton": "Promocionado en la tienda",
    "ListingModal.DetailsSection.RemoveListButton": "Eliminar de la lista",
    "ListingModal.DetailsSection.ImportListButton": "Agregar a la lista de importación",
    "ListingModal.DetailsSection.ImportListButton.Deactivated": "Lista desactivada",

    "InfoSection.ShippingTime.Tooltip":
      "Número de días para que se entregue el producto después de su envío.",
    "InfoSection.ShippingTime.Title": "Tiempo de envío",
    "InfoSection.ShippingInfo.Worldwide": "Internacional",
    "InfoSection.ShippingExcluded.Intro": "No se puede enviar a",
    "InfoSection.ShippingExcluded.Various": "Diferentes",
    "InfoSection.ProcessingTime.Tooltip":
      "Número de días hábiles que tarda el proveedor en realizar el envío y proporcionar un número de seguimiento",
    "InfoSection.ProcessingTime.Title": "Tiempo de procesamiento",
    "InfoSection.ProcessingTime.Period": "días hábiles",
    "InfoSection.ShippingInfoLine.Tooltip":
      "Este producto se envía por {{price_formatted}}, más {{incremental_price_formatted}} por cada producto adicional en el mismo pedido",
    "InfoSection.ShippingInfoLine.Period": "días hábiles",
    "InfoSection.ShippingInfoLine.Free": "GRATIS",
    "InfoSection.ShippingInfoLine.NoShipping": "No hace envíos",

    "ReturnPolicySection.Title": "Política de devoluciones",

    "TitleSection.TitleCountryOrigin.CountryOrigin.Intro": "Desde",
    "TitleSection.TitleCountryOrigin.SupplierShopName.Intro": "Por",
    "TitleSection.PriceMSRP.Listing": "Precio de lista",
    "TitleSection.PriceMSRP.Retail": "Precio de venta",

    "ProductVariationsModal.Title": "Variantes del producto",
    "ProductVariationsModal.Table.Image": "Imagen",
    "ProductVariationsModal.Table.Inventory": "Inventario",
    "ProductVariationsModal.Table.Price": "Precio",
    "ProductVariationsModal.ImageSpecifications.Title": "Tabla de tallas",
    "ProductVariationsModal.ImageSpecifications.Button": "Descargar",

    "TopSupplier.Tooltip":
      "Los proveedores principales son conocidos por la alta calidad de sus productos, su gran servicio y sus buenas calificaciones",
    "TopSupplier.Text": "Proveedor principal",

    "BestSelling.Tooltip.Top": "Este es uno de los productos principales de Spocket",
    "BestSelling.Tooltip.Bottom": "Más vendido",

    "GallerySection.PremiumIcon.Tooltip":
      "Vende en tu tienda productos exclusivos, con grandes descuentos y envío rápido",
    "GallerySection.PremiumIcon.Text": "Prémium",
    "GallerySection.DiscountStamp.Text": "{{value}} % de descuento adicional",

    "Upgrade.Title.AnnualToggled": "Obtén Spocket prémium hoy",
    "Upgrade.Title.MonthlyToggled": "Prueba Spocket prémium gratis durante 14 días",
    "Upgrade.Subtitle":
      "Prueba un plan prémium de Spocket hoy y comienza a agregar en tu tienda productos con alta conversión desde Estados Unidos y Europa.",
    "Upgrade.Button": "Continuar sin Spocket prémium",

    "Search.NoProductsFound.Title": "¡Te pedimos disculpas! No pudimos encontrar resultados",
    "Search.NoProductsFound.For": "para",
    "Search.NoProductsFound.Description":
      "Verifica que esté bien escrito, intenta buscar un término relacionado o uno más general.",
    "Search.Searching.Title": "Estamos buscando productos...",
    "Search.Searching.Description": "Espera mientras cargamos los últimos productos para ti.",

    "Suppliers.StarRating.Tooltip": "Tasa de cumplimiento de pedidos por parte del proveedor",
    "Suppliers.RefundPolicy": "Política de reembolso del proveedor",
    "Suppliers.Joined.Title": "Se unió a Spocket",
    "Suppliers.Origin.Title": "Envío desde el país",
    "Suppliers.Time.Title": "Tiempo promedio de procesamiento",
    "Suppliers.HasMore.Title": "Estamos buscando productos...",
    "Suppliers.HasMore.Subtitle": "Espera mientras cargamos los últimos productos para ti.",
    "Suppliers.TopSupplierTag.Tooltip":
      "Los proveedores principales son conocidos por la alta calidad de sus productos, su gran servicio y sus buenas calificaciones",
    "Suppliers.TopSupplierTag.Text": "Proveedor principal",

    "AltTextModal.Header.Title": "Editar información de la imagen",
    "AltTextModal.Body.Description":
      "Escribe una breve descripción de esta imagen para mejorar el posicionamiento en los buscadores (SEO) y la accesibilidad para los clientes con discapacidad visual.",
    "AltTextModal.Input.Label": "Texto alternativo",
    "AltTextModal.Input.Placeholder": "Texto alternativo de la imagen",
    "AltTextModal.Button.Cancel": "Cancelar",
    "AltTextModal.Button.Save": "Guardar",

    "WistiaModal.WhatIsSpocket.Title": "¿Qué es Spocket?",
    "WistiaModal.WhatIsSpocket.Text":
      "Conoce de qué manera Spocket puede ayudarte a desarrollar tu negocio. Aprende cómo funciona Spocket y cómo aprovecharlo al máximo.",
    "WistiaModal.WhatIsSpocket.Button": "Comienza a buscar productos",
    "WistiaModal.DiscoverProducts.Title": "Descubre productos",
    "WistiaModal.DiscoverProducts.Text":
      "Encuentra los productos correctos con la ayuda de los filtros adecuados y agrégalos a tu tienda.",
    "WistiaModal.DiscoverProducts.Button": "Comienza a buscar productos",
    "WistiaModal.ProductCustomization.Title": "Personaliza tus productos",
    "WistiaModal.ProductCustomization.Text":
      "Usa la lista de importación para modificar tus productos para que se adapten a tu tienda. Puedes editar la descripción del producto, establecer los precios, agregar el producto a una colección y eliminar imágenes.",
    "WistiaModal.ProductCustomization.Button": "Ir a la lista de importación",
    "WistiaModal.OrderProcessing.Title": "Procesamiento automatizado de pedidos",
    "WistiaModal.OrderProcessing.Text":
      "Completa tus pedidos y haz que el proveedor entregue el producto en la puerta del cliente con un solo clic.",
    "WistiaModal.OrderProcessing.Button": "Ir a los pedidos",
    "WistiaModal.Settings.Title": "Ajustes",
    "WistiaModal.Settings.Text":
      "La página de ajustes te permite gestionar toda la información de tu cuenta, ponerle la marca a tus facturas y agregar tu tarjeta de crédito. También puedes ajustar las reglas de precios para todos tus productos y elegir un plan de suscripción.",
    "WistiaModal.Settings.Button": "Configura tu cuenta",

    "Footer.Copyright": "Copyright {{year}}, Spocket. Todos los derechos reservados",
    "Footer.PrivacyPolicy": "Política de privacidad",
    "Footer.TermsConditions": "Términos y condiciones",
    "Footer.DataProcessingAddendum": "Apéndice sobre procesamiento de datos",

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
// ./src/utils/i18n/es.js