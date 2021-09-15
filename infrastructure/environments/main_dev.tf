provider "azurerm" {
	features {
	  key_vault {
		purge_soft_delete_on_destroy = true
	  }
	}
  }

  data "azurerm_client_config" "current" {}

  data "azurerm_resource_group" "dev" {
	name = "PINS-UK-DEV"
  }

  resource "azurerm_key_vault" "dev" {
	name                        = "pins-uk-dev-vault"
	location                    = data.azurerm_resource_group.dev.location
	resource_group_name         = data.azurerm_resource_group.dev.name
	enabled_for_disk_encryption = true
	tenant_id                   = data.azurerm_client_config.current.tenant_id
	soft_delete_retention_days  = 7
	purge_protection_enabled    = false

	sku_name = "standard"

	access_policy {
	  tenant_id = data.azurerm_client_config.current.tenant_id
	  object_id = data.azurerm_client_config.current.object_id

	  key_permissions = [
		"Backup","Create","Decrypt","Delete","Encrypt","Get","Import","List","Purge","Recover","Restore","Sign","UnwrapKey","Update","Verify","WrapKey"
	  ]

	  secret_permissions = [
    "Backup","Delete","Get","List","Purge","Recover","Restore","Set"
	  ]

	  storage_permissions = [
    "Backup","Delete","DeleteSAS","Get","GetSAS","List","ListSAS","Purge","Recover","RegenerateKey","Restore","Set","SetSAS","Update"
	  ]
	}
  }

  resource "azurerm_key_vault_secret" "dev" {
    for_each = var.dev
  name         = each.key
  value        =  each.value
  key_vault_id = azurerm_key_vault.dev.id
